// Storage layer with two adapters behind one interface:
//   DemoStore     — JSON + files under .data/ (local dev, demo deploys; zero setup)
//   SupabaseStore — Postgres + Storage via REST (production; create the project in
//                   ca-central-1 for Canadian data residency). Selected automatically
//                   when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
//
// All access is server-side only. The browser never talks to storage directly.

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { DealPath, DocRequirement, IntakeAnswers, PathNote } from "./rules/types";

export type FileStatus = "invited" | "collecting" | "review" | "complete";
export type DocStatus = "processing" | "verified" | "needs_reupload" | "needs_review" | "accepted" | "rejected";

export interface ClientFile {
  id: string;
  token: string;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  consentAt?: string;
  answers?: IntakeAnswers;
  path?: DealPath;
  requirements?: DocRequirement[];
  notes?: PathNote[];
  status: FileStatus;
}

export interface DocRecord {
  id: string;
  fileId: string;
  reqKey: string;
  part?: string;
  filename: string;
  contentType: string;
  storagePath: string;
  uploadedAt: string;
  status: DocStatus;
  /** Plain-English reason shown to client/agent (e.g. "Photo is blurry — retake in good light"). */
  reason?: string;
  /** Extracted fields — ALWAYS post-scrub; never contains a SIN or card number. */
  extracted?: Record<string, string>;
  sinDetected?: boolean;
  cardDetected?: boolean;
  flags?: string[];
}

export interface AuditEvent {
  ts: string;
  fileId: string;
  actor: "client" | "agent" | "system";
  action: string;
  detail?: string;
}

export interface Store {
  createFile(input: { clientName: string; clientEmail: string }): Promise<ClientFile>;
  getFile(id: string): Promise<ClientFile | null>;
  getFileByToken(token: string): Promise<ClientFile | null>;
  listFiles(): Promise<ClientFile[]>;
  updateFile(id: string, patch: Partial<ClientFile>): Promise<ClientFile>;
  createDoc(doc: Omit<DocRecord, "id">): Promise<DocRecord>;
  updateDoc(id: string, patch: Partial<DocRecord>): Promise<DocRecord>;
  listDocs(fileId: string): Promise<DocRecord[]>;
  putBlob(storagePath: string, data: Buffer, contentType: string): Promise<void>;
  getBlob(storagePath: string): Promise<Buffer | null>;
  audit(e: Omit<AuditEvent, "ts">): Promise<void>;
  listAudit(fileId: string): Promise<AuditEvent[]>;
}

export const newId = () => crypto.randomBytes(9).toString("base64url");
export const newToken = () => crypto.randomBytes(24).toString("base64url");

// ---------------------------------------------------------------- DemoStore
const DATA_DIR = path.join(process.cwd(), ".data");

interface Db {
  files: ClientFile[];
  docs: DocRecord[];
  events: AuditEvent[];
}

async function readDb(): Promise<Db> {
  try {
    return JSON.parse(await fs.readFile(path.join(DATA_DIR, "db.json"), "utf8"));
  } catch {
    return { files: [], docs: [], events: [] };
  }
}

async function writeDb(db: Db) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, "db.json"), JSON.stringify(db, null, 2));
}

class DemoStore implements Store {
  async createFile(input: { clientName: string; clientEmail: string }) {
    const db = await readDb();
    const file: ClientFile = {
      id: newId(),
      token: newToken(),
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      createdAt: new Date().toISOString(),
      status: "invited",
    };
    db.files.push(file);
    await writeDb(db);
    return file;
  }
  async getFile(id: string) {
    return (await readDb()).files.find((f) => f.id === id) ?? null;
  }
  async getFileByToken(token: string) {
    return (await readDb()).files.find((f) => f.token === token) ?? null;
  }
  async listFiles() {
    return (await readDb()).files.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  async updateFile(id: string, patch: Partial<ClientFile>) {
    const db = await readDb();
    const i = db.files.findIndex((f) => f.id === id);
    if (i < 0) throw new Error("file not found");
    db.files[i] = { ...db.files[i], ...patch };
    await writeDb(db);
    return db.files[i];
  }
  async createDoc(doc: Omit<DocRecord, "id">) {
    const db = await readDb();
    const rec: DocRecord = { ...doc, id: newId() };
    db.docs.push(rec);
    await writeDb(db);
    return rec;
  }
  async updateDoc(id: string, patch: Partial<DocRecord>) {
    const db = await readDb();
    const i = db.docs.findIndex((d) => d.id === id);
    if (i < 0) throw new Error("doc not found");
    db.docs[i] = { ...db.docs[i], ...patch };
    await writeDb(db);
    return db.docs[i];
  }
  async listDocs(fileId: string) {
    return (await readDb()).docs.filter((d) => d.fileId === fileId);
  }
  async putBlob(storagePath: string, data: Buffer) {
    const p = path.join(DATA_DIR, "uploads", storagePath);
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, data);
  }
  async getBlob(storagePath: string) {
    try {
      return await fs.readFile(path.join(DATA_DIR, "uploads", storagePath));
    } catch {
      return null;
    }
  }
  async audit(e: Omit<AuditEvent, "ts">) {
    const db = await readDb();
    db.events.push({ ...e, ts: new Date().toISOString() });
    await writeDb(db);
  }
  async listAudit(fileId: string) {
    return (await readDb()).events.filter((e) => e.fileId === fileId);
  }
}

// ------------------------------------------------------------ SupabaseStore
// Tables (see README for SQL): aw_files, aw_docs, aw_events. Bucket: client-docs.
class SupabaseStore implements Store {
  constructor(
    private url: string,
    private key: string,
    private bucket: string,
  ) {}

  private async rest(pathname: string, init?: RequestInit): Promise<any> {
    const res = await fetch(`${this.url}/rest/v1/${pathname}`, {
      ...init,
      headers: {
        apikey: this.key,
        Authorization: `Bearer ${this.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) throw new Error(`supabase ${pathname}: ${res.status} ${await res.text()}`);
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  async createFile(input: { clientName: string; clientEmail: string }) {
    const file: ClientFile = {
      id: newId(),
      token: newToken(),
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      createdAt: new Date().toISOString(),
      status: "invited",
    };
    await this.rest("aw_files", { method: "POST", body: JSON.stringify({ id: file.id, data: file }) });
    return file;
  }
  private unwrap = (rows: any[]): any | null => (rows?.length ? rows[0].data : null);
  async getFile(id: string) {
    return this.unwrap(await this.rest(`aw_files?id=eq.${encodeURIComponent(id)}&select=data`));
  }
  async getFileByToken(token: string) {
    return this.unwrap(await this.rest(`aw_files?data->>token=eq.${encodeURIComponent(token)}&select=data`));
  }
  async listFiles() {
    const rows = await this.rest("aw_files?select=data&order=id.desc");
    return (rows ?? []).map((r: any) => r.data);
  }
  async updateFile(id: string, patch: Partial<ClientFile>) {
    const current = await this.getFile(id);
    if (!current) throw new Error("file not found");
    const next = { ...current, ...patch };
    await this.rest(`aw_files?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ data: next }) });
    return next;
  }
  async createDoc(doc: Omit<DocRecord, "id">) {
    const rec: DocRecord = { ...doc, id: newId() };
    await this.rest("aw_docs", { method: "POST", body: JSON.stringify({ id: rec.id, file_id: rec.fileId, data: rec }) });
    return rec;
  }
  async updateDoc(id: string, patch: Partial<DocRecord>) {
    const rows = await this.rest(`aw_docs?id=eq.${encodeURIComponent(id)}&select=data`);
    const current = this.unwrap(rows);
    if (!current) throw new Error("doc not found");
    const next = { ...current, ...patch };
    await this.rest(`aw_docs?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ data: next }) });
    return next;
  }
  async listDocs(fileId: string) {
    const rows = await this.rest(`aw_docs?file_id=eq.${encodeURIComponent(fileId)}&select=data`);
    return (rows ?? []).map((r: any) => r.data);
  }
  async putBlob(storagePath: string, data: Buffer, contentType: string) {
    const res = await fetch(`${this.url}/storage/v1/object/${this.bucket}/${storagePath}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.key}`, "Content-Type": contentType, "x-upsert": "true" },
      body: new Uint8Array(data),
    });
    if (!res.ok) throw new Error(`supabase storage put: ${res.status}`);
  }
  async getBlob(storagePath: string) {
    const res = await fetch(`${this.url}/storage/v1/object/${this.bucket}/${storagePath}`, {
      headers: { Authorization: `Bearer ${this.key}` },
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  }
  async audit(e: Omit<AuditEvent, "ts">) {
    await this.rest("aw_events", {
      method: "POST",
      body: JSON.stringify({ file_id: e.fileId, data: { ...e, ts: new Date().toISOString() } }),
    });
  }
  async listAudit(fileId: string) {
    const rows = await this.rest(`aw_events?file_id=eq.${encodeURIComponent(fileId)}&select=data`);
    return (rows ?? []).map((r: any) => r.data);
  }
}

let store: Store | null = null;
export function getStore(): Store {
  if (!store) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    store =
      url && key
        ? new SupabaseStore(url, key, process.env.SUPABASE_BUCKET || "client-docs")
        : new DemoStore();
  }
  return store;
}
