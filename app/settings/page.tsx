"use client";

import { useEffect, useState } from "react";
import { Check, Eye, EyeOff, RotateCcw, Save, Sparkles } from "lucide-react";
import {
  AI_MODELS,
  CrmSettings,
  DEFAULT_SETTINGS,
  isAiActive,
  loadSettings,
  saveSettings,
} from "@/lib/settings";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [settings, setSettings] = useState<CrmSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  function update<K extends keyof CrmSettings>(
    key: K,
    value: CrmSettings[K]
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

  const aiActive = isAiActive(settings);

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Customize your CRM template and integrations"
      >
        <Button onClick={onSave} variant="gold">
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {/* Company */}
          <Card>
            <CardContent className="space-y-5 p-6">
              <h2 className="font-serif text-lg text-charcoal">
                Company Profile
              </h2>

              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  className="mt-2"
                  value={settings.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  className="mt-2"
                  placeholder="https://…"
                  value={settings.logoUrl}
                  onChange={(e) => update("logoUrl", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Office Address</Label>
                <Input
                  id="address"
                  className="mt-2"
                  value={settings.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="primaryColor">Color Theme (Accent)</Label>
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

              <div>
                <Label htmlFor="managers">
                  Property Managers (comma separated)
                </Label>
                <Input
                  id="managers"
                  className="mt-2"
                  value={settings.managers}
                  onChange={(e) => update("managers", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Integration */}
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold-dark" />
                  <h2 className="font-serif text-lg text-charcoal">
                    AI Integration
                  </h2>
                </div>
                {aiActive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    Inactive
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="apiKey">Anthropic API Key</Label>
                <div className="relative mt-2">
                  <Input
                    id="apiKey"
                    type={showKey ? "text" : "password"}
                    placeholder="sk-ant-…"
                    className="pr-10 font-mono"
                    value={settings.apiKey}
                    onChange={(e) => update("apiKey", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-charcoal"
                    aria-label={showKey ? "Hide key" : "Show key"}
                  >
                    {showKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Your key is stored locally and never sent to our servers. Get
                  a key at{" "}
                  <a
                    href="https://console.anthropic.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold-dark underline"
                  >
                    console.anthropic.com
                  </a>
                  .
                </p>
              </div>

              <div>
                <Label htmlFor="aiModel">AI Model</Label>
                <Select
                  value={settings.aiModel}
                  onValueChange={(v) => update("aiModel", v)}
                >
                  <SelectTrigger id="aiModel" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_MODELS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-md border border-border bg-secondary/40 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    Enable AI Assistant
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Show the assistant as active across the CRM.
                  </p>
                </div>
                <Switch
                  checked={settings.aiEnabled}
                  onCheckedChange={(v) => update("aiEnabled", v)}
                />
              </div>

              <Button onClick={onReset} variant="ghost" size="sm">
                <RotateCcw className="h-4 w-4" /> Reset to Defaults
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Live preview */}
        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Brand Preview
          </p>
          <Card className="overflow-hidden">
            <div
              className="h-24"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}, #1a1a1a)`,
              }}
            />
            <CardContent className="p-6">
              <div className="-mt-12 flex items-end">
                <div
                  className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-4 border-card bg-secondary font-serif text-xl text-charcoal"
                  style={{
                    backgroundImage: settings.logoUrl
                      ? `url(${settings.logoUrl})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!settings.logoUrl &&
                    (settings.companyName?.[0]?.toUpperCase() ?? "P")}
                </div>
              </div>

              <h3 className="mt-4 font-serif text-xl text-charcoal">
                {settings.companyName || "Your Company"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {settings.address || "—"}
              </p>

              <div className="mt-5">
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Property Managers
                </p>
                <div className="flex flex-wrap gap-2">
                  {settings.managers
                    .split(",")
                    .map((m) => m.trim())
                    .filter(Boolean)
                    .map((m) => (
                      <span
                        key={m}
                        className="rounded-full px-2.5 py-1 text-xs"
                        style={{
                          backgroundColor: `${settings.primaryColor}22`,
                          color: settings.primaryColor,
                        }}
                      >
                        {m}
                      </span>
                    ))}
                </div>
              </div>

              <button
                className="mt-6 w-full rounded-md py-2.5 text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Accent Button
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
