export interface CrmSettings {
  companyName: string;
  logoUrl: string;
  address: string;
  primaryColor: string; // hex accent
  managers: string; // comma separated
  // AI integration
  apiKey: string;
  aiModel: string;
  aiEnabled: boolean;
}

export const AI_MODELS = [
  "claude-sonnet-4-6",
  "claude-opus-4-8",
  "claude-haiku-4-5",
] as const;

export const DEFAULT_SETTINGS: CrmSettings = {
  companyName: "Prestige Properties",
  logoUrl: "",
  address: "210 Marina Bluffs Boulevard, Suite 400, San Diego, CA",
  primaryColor: "#bfa181",
  managers: "Sofia Marquez, Daniel Brooks, Marcus Lee, Priya Nair",
  apiKey: "",
  aiModel: "claude-sonnet-4-6",
  aiEnabled: false,
};

const STORAGE_KEY = "prestige-crm-settings";

export function loadSettings(): CrmSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: CrmSettings): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  // Notify same-tab listeners (storage event only fires cross-tab).
  window.dispatchEvent(new CustomEvent("crm-settings-changed"));
}

export function isAiActive(s: CrmSettings): boolean {
  return s.aiEnabled && s.apiKey.trim().length > 0;
}
