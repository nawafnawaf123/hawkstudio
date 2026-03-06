"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toaster";
import { Save } from "lucide-react";

export type SettingsForm = {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  maintenanceMode: boolean;
  socialInstagram?: string;
  socialX?: string;
  socialLinkedIn?: string;
  socialGithub?: string;
};

export function SettingsEditor({ initial }: { initial: SettingsForm }) {
  const [form, setForm] = useState<SettingsForm>(initial);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      toast({ title: "تم حفظ الإعدادات ✅" });
    } catch (e: any) {
      toast({ title: "خطأ", description: e?.message || "تعذر الحفظ" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6">
      <div className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            placeholder="Site name"
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          />
          <Input
            placeholder="Site URL (https://...)"
            value={form.siteUrl}
            onChange={(e) => setForm({ ...form, siteUrl: e.target.value })}
          />
        </div>

        <Input
          placeholder="Description"
          value={form.siteDescription}
          onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
        />

        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Phone"
            value={form.contactPhone}
            onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
          />
          <Input
            placeholder="WhatsApp"
            value={form.contactWhatsApp}
            onChange={(e) => setForm({ ...form, contactWhatsApp: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.contactEmail}
            onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          />
        </div>

        <div className="card p-4">
          <div className="text-xs font-semibold text-white/70">Maintenance</div>
          <label className="pill mt-3 cursor-pointer">
            <input
              type="checkbox"
              className="ml-2"
              checked={form.maintenanceMode}
              onChange={(e) =>
                setForm({ ...form, maintenanceMode: e.target.checked })
              }
            />
            Enable maintenance mode
          </label>
          <div className="mt-2 text-xs text-white/55">
            عند التفعيل: كل الموقع يتحول لصفحة الصيانة (ما عدا /admin و /api).
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            placeholder="GitHub URL"
            value={form.socialGithub || ""}
            onChange={(e) => setForm({ ...form, socialGithub: e.target.value })}
          />
          <Input
            placeholder="LinkedIn URL"
            value={form.socialLinkedIn || ""}
            onChange={(e) =>
              setForm({ ...form, socialLinkedIn: e.target.value })
            }
          />
          <Input
            placeholder="Instagram URL"
            value={form.socialInstagram || ""}
            onChange={(e) =>
              setForm({ ...form, socialInstagram: e.target.value })
            }
          />
          <Input
            placeholder="X URL"
            value={form.socialX || ""}
            onChange={(e) => setForm({ ...form, socialX: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          onClick={save}
          type="button"
          className="btn btn-primary"
        >
          {loading ? "Saving..." : "Save"}
          <Save className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
