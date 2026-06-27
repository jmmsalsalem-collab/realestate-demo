"use client";

import { useEffect, useState } from "react";
import {
  CrmSettings,
  DEFAULT_SETTINGS,
  loadSettings,
} from "@/lib/settings";

/**
 * Reactive read of CRM settings from localStorage. Re-reads on the custom
 * "crm-settings-changed" event (same tab) and the native storage event
 * (other tabs). Returns DEFAULT_SETTINGS until hydrated to avoid SSR mismatch.
 */
export function useSettings(): { settings: CrmSettings; hydrated: boolean } {
  const [settings, setSettings] = useState<CrmSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => setSettings(loadSettings());
    sync();
    setHydrated(true);
    window.addEventListener("crm-settings-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("crm-settings-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { settings, hydrated };
}
