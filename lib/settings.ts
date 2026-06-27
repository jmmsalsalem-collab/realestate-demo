export interface AgencySettings {
  agencyName: string;
  primaryColor: string; // hex
  agentName: string;
  agentPhoto: string; // url or data uri
  officeAddress: string;
  phone: string;
  featuredNeighborhoods: string;
}

export const DEFAULT_SETTINGS: AgencySettings = {
  agencyName: "Prestige Properties",
  primaryColor: "#bfa181",
  agentName: "Alex Rivera",
  agentPhoto: "",
  officeAddress: "210 Marina Bluffs Boulevard, Suite 400",
  phone: "(415) 555-0142",
  featuredNeighborhoods:
    "Hillcrest Estates, Marina Bluffs, Old Oak Village, Summit Ridge",
};

const STORAGE_KEY = "prestige-settings";

export function loadSettings(): AgencySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AgencySettings): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
