import { NextRequest, NextResponse } from "next/server";
import { checkAgentPassword, sessionCookie } from "@/lib/session";
import { rateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`auth:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts — wait a minute." }, { status: 429 });
  }
  const form = await req.formData();
  const pw = String(form.get("password") ?? "");
  if (!checkAgentPassword(pw)) {
    return NextResponse.redirect(new URL("/?error=1", req.url), 303);
  }
  const res = NextResponse.redirect(new URL("/dashboard", req.url), 303);
  res.cookies.set(sessionCookie());
  return res;
}
