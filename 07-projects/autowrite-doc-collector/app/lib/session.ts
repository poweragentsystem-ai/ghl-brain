// Agent session auth: password login → HMAC-signed, time-limited cookie.
// Single-tenant v1 (Renée). Multi-tenant swaps this for real user auth; the rest
// of the app only ever asks "is this request an authenticated agent?".
import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "aw_agent";
const MAX_AGE_S = 60 * 60 * 12; // 12h

function secret(): string {
  return process.env.AUTH_SECRET || "dev-secret-change-me";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function makeSessionValue(): string {
  const payload = `agent.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const idx = value.lastIndexOf(".");
  if (idx < 0) return false;
  const payload = value.slice(0, idx);
  const sig = value.slice(idx + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const ts = Number(payload.split(".")[1]);
  return Number.isFinite(ts) && Date.now() - ts < MAX_AGE_S * 1000;
}

export function isAgentAuthed(): boolean {
  return verifySessionValue(cookies().get(COOKIE)?.value);
}

export function sessionCookie() {
  return {
    name: COOKIE,
    value: makeSessionValue(),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_S,
    path: "/",
  };
}

export function checkAgentPassword(pw: string): boolean {
  const expected = process.env.AGENT_PASSWORD || "change-me";
  const a = Buffer.from(pw);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
