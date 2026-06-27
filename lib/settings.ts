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
  "gemini-2.5-flash",
  "gemini-2.5-pro",
] as const;

export const DEFAULT_SETTINGS: CrmSettings = {
  companyName: "Prestige Properties",
  logoUrl: "",
  address: "Al-Hamra Tower, Floor 32, Sharq, Kuwait City",
  primaryColor: "#B8962E",
  managers:
    "Abdulaziz Al-Saqr, Lulwa Al-Bahar, Yousef Al-Otaibi, Dana Al-Mutairi",
  apiKey: "",
  aiModel: "gemini-2.5-flash",
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
