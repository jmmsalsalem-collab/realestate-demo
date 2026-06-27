"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw, Save } from "lucide-react";
import {
  AgencySettings,
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
} from "@/lib/settings";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState<AgencySettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  function update<K extends keyof AgencySettings>(
    key: K,
    value: AgencySettings[K]
  ) {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  }

  function onSave() {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function onReset() {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    setSaved(false);
  }

  const neighborhoods = settings.featuredNeighborhoods
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-dark">
          White-Label Template
        </p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal">
          Agency Settings
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Personalize this template for your brand. Settings are saved to your
          browser&apos;s local storage and power the live preview below.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Form */}
        <Card>
          <CardContent className="space-y-5 p-6">
            <div>
              <Label htmlFor="agencyName">Agency Name</Label>
              <Input
                id="agencyName"
                className="mt-2"
                value={settings.agencyName}
                onChange={(e) => update("agencyName", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="primaryColor">Primary / Accent Color</Label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => update("primaryColor", e.target.value)}
                  className="h-11 w-14 cursor-pointer rounded-md border border-input bg-card"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => update("primaryColor", e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="agentName">Agent Name</Label>
                <Input
                  id="agentName"
                  className="mt-2"
                  value={settings.agentName}
                  onChange={(e) => update("agentName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  className="mt-2"
                  value={settings.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="agentPhoto">Agent Photo URL</Label>
              <Input
                id="agentPhoto"
                className="mt-2"
                placeholder="https://…"
                value={settings.agentPhoto}
                onChange={(e) => update("agentPhoto", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="officeAddress">Office Address</Label>
              <Input
                id="officeAddress"
                className="mt-2"
                value={settings.officeAddress}
                onChange={(e) => update("officeAddress", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="featuredNeighborhoods">
                Featured Neighborhoods (comma separated)
              </Label>
              <Input
                id="featuredNeighborhoods"
                className="mt-2"
                value={settings.featuredNeighborhoods}
                onChange={(e) =>
                  update("featuredNeighborhoods", e.target.value)
                }
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={onSave} variant="gold">
                {saved ? (
                  <>
                    <Check className="h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" /> Save Settings
                  </>
                )}
              </Button>
              <Button onClick={onReset} variant="ghost">
                <RotateCcw className="h-4 w-4" /> Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live preview */}
        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Live Preview
          </p>
          <Card className="overflow-hidden">
            <div
              className="h-28"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}, #1a1a1a)`,
              }}
            />
            <CardContent className="p-6">
              <div className="-mt-14 flex items-end gap-4">
                <div
                  className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-secondary text-2xl font-serif text-charcoal"
                  style={{
                    backgroundImage: settings.agentPhoto
                      ? `url(${settings.agentPhoto})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!settings.agentPhoto &&
                    (settings.agentName?.[0]?.toUpperCase() ?? "A")}
                </div>
              </div>

              <h2 className="mt-4 font-serif text-2xl text-charcoal">
                {settings.agencyName || "Your Agency"}
              </h2>
              <p
                className="text-sm font-medium"
                style={{ color: settings.primaryColor }}
              >
                {settings.agentName || "Agent Name"}
              </p>

              <dl className="mt-4 space-y-1.5 text-sm text-charcoal/80">
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">Office:</dt>
                  <dd>{settings.officeAddress || "—"}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">Phone:</dt>
                  <dd>{settings.phone || "—"}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Featured Neighborhoods
                </p>
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.length > 0 ? (
                    neighborhoods.map((n) => (
                      <span
                        key={n}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                          backgroundColor: `${settings.primaryColor}22`,
                          color: settings.primaryColor,
                        }}
                      >
                        {n}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>
              </div>

              <button
                className="mt-6 w-full rounded-md py-3 text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Contact {settings.agentName?.split(" ")[0] || "Us"}
              </button>
            </CardContent>
          </Card>
          {!hydrated && (
            <p className="mt-3 text-xs text-muted-foreground">Loading…</p>
          )}
        </div>
      </div>
    </div>
  );
}
