"use client";

import { Key, Monitor, ShieldCheck, Smartphone } from "lucide-react";
import { loginSessions, recentDevices } from "@/lib/notifications-data";
import { SettingsSectionCard } from "@/components/settings/settings-section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecuritySettingsSection() {
  return (
    <div className="space-y-6">
      <SettingsSectionCard
        title="Password"
        description="Change your password to keep your account secure."
      >
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" className="rounded-xl" />
          </div>
          <Button className="rounded-xl">Update Password</Button>
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Two-Factor Authentication">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium text-foreground">Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security with 2FA.
              </p>
            </div>
          </div>
          <Switch aria-label="Enable two-factor authentication" checked={false} onCheckedChange={() => {}} />
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Login Sessions">
        <div className="space-y-3">
          {loginSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <Monitor className="size-5 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground">{session.device}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.location} · {session.lastActive}
                  </p>
                </div>
              </div>
              {session.current ? (
                <Badge className="rounded-lg">Current</Badge>
              ) : (
                <Button variant="outline" size="sm" className="rounded-xl text-xs">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Recent Devices">
        <div className="space-y-3">
          {recentDevices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-muted/30 p-4"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="size-5 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground">{device.name}</p>
                  <p className="text-xs text-muted-foreground">Last used {device.lastUsed}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={device.trusted ? "rounded-lg border-green-300 text-green-700" : "rounded-lg"}
              >
                {device.trusted ? "Trusted" : "Unknown"}
              </Badge>
            </div>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Account Recovery">
        <div className="flex items-start gap-3">
          <Key className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium text-foreground">Recovery Email</p>
            <p className="text-sm text-muted-foreground">sarah.chen@email.com</p>
            <Button variant="outline" className="mt-3 rounded-xl" size="sm">
              Update Recovery Options
            </Button>
          </div>
        </div>
      </SettingsSectionCard>
    </div>
  );
}
