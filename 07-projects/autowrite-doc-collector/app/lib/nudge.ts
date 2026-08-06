// Nudge engine — the "stop chasing documents" magic.
//
// SAFETY (standing business rule): outside production, every email is forced to
// TEST_CONTACT_EMAIL (Renée's test contact). Real client sends require BOTH
// APP_ENV=production AND a deliberate go-live decision. Without RESEND_API_KEY,
// nudges are logged to the audit trail only — still fully demoable.

import { getStore } from "./store";

interface Nudge {
  fileId: string;
  to: string;
  subject: string;
  body: string;
}

function resolveRecipient(to: string): string {
  const test = process.env.TEST_CONTACT_EMAIL || "renee.ross@gmail.com";
  return process.env.APP_ENV === "production" ? to : test;
}

export async function sendNudge(n: Nudge): Promise<{ sent: boolean; via: string }> {
  const store = getStore();
  const to = resolveRecipient(n.to);
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    await store.audit({
      fileId: n.fileId,
      actor: "system",
      action: "nudge_logged",
      detail: `(no mail key — logged only) to=${to} subject="${n.subject}"`,
    });
    return { sent: false, via: "log" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || "documents@autowrite.ca",
      to: [to],
      subject: n.subject,
      text: n.body,
    }),
  });
  await store.audit({
    fileId: n.fileId,
    actor: "system",
    action: res.ok ? "nudge_sent" : "nudge_failed",
    detail: `to=${to} subject="${n.subject}"${res.ok ? "" : ` status=${res.status}`}`,
  });
  return { sent: res.ok, via: "resend" };
}

export function reuploadEmail(clientName: string, docLabel: string, reason: string, link: string) {
  return {
    subject: `One document needs a quick re-upload`,
    body: `Hi ${clientName},

Quick one — your ${docLabel} needs another go:

${reason}

Upload it again here (takes under a minute):
${link}

Everything else you've sent is looking good.

— The team`,
  };
}

export function missingDocsEmail(clientName: string, missing: string[], link: string) {
  const list = missing.map((m) => `  • ${m}`).join("\n");
  return {
    subject: `You're close — ${missing.length} document${missing.length > 1 ? "s" : ""} to go`,
    body: `Hi ${clientName},

Your file is coming together nicely. Still waiting on:

${list}

Upload here whenever you have a minute:
${link}

— The team`,
  };
}
