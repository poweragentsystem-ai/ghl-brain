import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isAgentAuthed } from "@/lib/session";

export const dynamic = "force-dynamic";

import { getProfile, PROFILE_PATH, type AgentProfile } from "@/lib/profile";

const MAX_IMG = 400 * 1024;

async function fileToDataUrl(f: File | null): Promise<string | undefined> {
  if (!f || f.size === 0) return undefined;
  if (f.size > MAX_IMG) throw new Error("Images must be under 400 KB — a small PNG/JPG works best.");
  if (!["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(f.type)) {
    throw new Error("Logo/headshot must be PNG, JPG, WebP or SVG.");
  }
  return `data:${f.type};base64,${Buffer.from(await f.arrayBuffer()).toString("base64")}`;
}

export async function GET() {
  if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await getProfile());
}

export async function POST(req: NextRequest) {
  if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const form = await req.formData();
  const current = await getProfile();
  try {
    const logo = await fileToDataUrl(form.get("logo") as File | null);
    const headshot = await fileToDataUrl(form.get("headshot") as File | null);
    const profile: AgentProfile = {
      agentName: String(form.get("agentName") ?? current.agentName ?? "").trim() || undefined,
      credentials: String(form.get("credentials") ?? current.credentials ?? "").trim() || undefined,
      companyName: String(form.get("companyName") ?? current.companyName ?? "").trim() || undefined,
      logoDataUrl: logo ?? (form.get("clearLogo") ? undefined : current.logoDataUrl),
      headshotDataUrl: headshot ?? (form.get("clearHeadshot") ? undefined : current.headshotDataUrl),
    };
    await getStore().putBlob(PROFILE_PATH, Buffer.from(JSON.stringify(profile)), "application/json");
    return NextResponse.redirect(new URL("/dashboard/settings?saved=1", req.url), 303);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "save failed" }, { status: 400 });
  }
}
