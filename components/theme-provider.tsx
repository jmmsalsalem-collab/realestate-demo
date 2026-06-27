"use client";

import { useEffect } from "react";
import { useSettings } from "@/lib/use-settings";
import { hexToHslParts } from "@/lib/utils";

/**
 * Applies the user's accent color (from Settings) to the gold brand CSS
 * variables at runtime, so the whole CRM re-themes live. Renders nothing.
 */
export function ThemeProvider() {
  const { settings } = useSettings();

  useEffect(() => {
    const parts = hexToHslParts(settings.primaryColor);
    const root = document.documentElement;
    if (!parts) {
      root.style.removeProperty("--gold");
      root.style.removeProperty("--gold-dark");
      root.style.removeProperty("--gold-light");
      return;
    }
    const [h, s, l] = parts.split(" ");
    const lNum = parseInt(l);
    const sNum = parseInt(s);
    root.style.setProperty("--gold", parts);
    root.style.setProperty(
      "--gold-dark",
      `${h} ${s} ${Math.max(lNum - 8, 20)}%`
    );
    // Always a pale tint for badges/icon backgrounds, regardless of accent.
    root.style.setProperty(
      "--gold-light",
      `${h} ${Math.min(sNum, 55)}% 93%`
    );
    root.style.setProperty("--ring", parts);
    root.style.setProperty("--accent", parts);
  }, [settings.primaryColor]);

  return null;
}
