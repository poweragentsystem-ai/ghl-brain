// Agent branding profile — shared by settings, portal, and dashboard.
import { getStore } from "./store";

export interface AgentProfile {
  agentName?: string;
  credentials?: string;
  companyName?: string;
  logoDataUrl?: string;
  headshotDataUrl?: string;
}

export const PROFILE_PATH = "_profile/profile.json";

export async function getProfile(): Promise<AgentProfile> {
  const buf = await getStore().getBlob(PROFILE_PATH);
  if (!buf) return {};
  try {
    return JSON.parse(buf.toString("utf8"));
  } catch {
    return {};
  }
}
