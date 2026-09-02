// HARD GUARDRAILS — enforced by the test suite, not promised by a prompt.
// If any of these fail, the build is not shippable. Adding a forbidden
// capability requires consciously deleting a named guardrail test — which is
// exactly the visibility Renée requires.
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";
import { resolveRecipient } from "./nudge";

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (["node_modules", ".next", ".data"].includes(name)) continue;
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) sourceFiles(p, acc);
    else if (/\.(ts|tsx|js|mjs)$/.test(name) && !name.endsWith(".test.ts")) acc.push(p);
  }
  return acc;
}

const ROOT = path.resolve(__dirname, "..");

describe("GUARDRAIL: the app cannot email real clients outside production", () => {
  it("non-production recipients are force-routed to the test contact", () => {
    const prev = process.env.APP_ENV;
    process.env.APP_ENV = "test";
    expect(resolveRecipient("asha.james@example.com")).toBe(process.env.TEST_CONTACT_EMAIL || "renee.ross@gmail.com");
    process.env.APP_ENV = "";
    expect(resolveRecipient("anyone@anywhere.com")).toBe(process.env.TEST_CONTACT_EMAIL || "renee.ross@gmail.com");
    process.env.APP_ENV = prev;
  });
});

describe("GUARDRAIL: no credit-pull capability exists anywhere in this codebase", () => {
  it("no source file references a credit bureau", () => {
    const offenders = sourceFiles(ROOT).filter((f) => /equifax|transunion|creditbureau/i.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});

describe("GUARDRAIL: no lender-submission capability exists — filling is software's job, submitting is the licensed agent's", () => {
  it("no API route path contains 'submit'", () => {
    const routes = sourceFiles(path.join(ROOT, "app", "api")).filter((f) => /submit/i.test(f));
    expect(routes).toEqual([]);
  });
  it("no source file POSTs to a lender system (velocity/finmo/filogix endpoints)", () => {
    const offenders = sourceFiles(ROOT).filter((f) =>
      /fetch\([^)]*(newton\.ca|velocity|finmo|filogix|lendesk)/i.test(readFileSync(f, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});

describe("GUARDRAIL: SIN can never be persisted (belt-and-suspenders over sin.test.ts)", () => {
  it("reader drops fields whose only content is a masked SIN and store writes go through scrubbed extraction", () => {
    // The behavioural proof lives in sin.test.ts + reader pipeline; this tripwire
    // asserts nobody has added a raw pass-through of extracted fields.
    const reader = readFileSync(path.join(ROOT, "lib", "ai", "reader.ts"), "utf8");
    expect(reader).toContain("scrubSensitive");
    const upload = readFileSync(path.join(ROOT, "app", "api", "portal", "[token]", "upload", "route.ts"), "utf8");
    expect(upload).toContain("outcome.extracted");
  });
});
