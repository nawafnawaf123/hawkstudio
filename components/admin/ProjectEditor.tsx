"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/components/ui/Toaster";
import { Upload, Save } from "lucide-react";

type ProjectForm = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  images: string[];
  tech: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
  published: boolean;
};

function slugify(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ProjectEditor({ initial }: { initial: ProjectForm }) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<ProjectForm>(initial);

  useEffect(() => {
    if (!initial.id && form.title && !form.slug) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  const techText = useMemo(() => form.tech.join(", "), [form.tech]);

  async function upload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      return data.url as string;
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: initial.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");

      toast({ title: "تم الحفظ ✅" });
      if (!initial.id) {
        window.location.href = `/admin/projects/${data.id}`;
      }
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
            placeholder="عنوان المشروع"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            placeholder="slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
          />
        </div>

        <Input
          placeholder="ملخص قصير"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />

        <Textarea
          placeholder="وصف تفصيلي"
          rows={7}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            placeholder="Tech (comma separated)"
            value={techText}
            onChange={(e) =>
              setForm({
                ...form,
                tech: e.target.value
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              })
            }
          />
          <Input
            placeholder="Live URL (optional)"
            value={form.liveUrl || ""}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value || null })}
          />
        </div>

        <Input
          placeholder="Repo URL (optional)"
          value={form.repoUrl || ""}
          onChange={(e) => setForm({ ...form, repoUrl: e.target.value || null })}
        />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="card p-4">
            <div className="text-xs font-semibold text-white/70">Cover</div>
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.coverImage || "/uploads/demo-1.png"}
                alt="cover"
                className="h-16 w-24 rounded-xl object-cover opacity-90"
              />
              <label className="btn cursor-pointer">
                <Upload className="h-4 w-4 text-neon-300/90" />
                {uploading ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const url = await upload(f);
                    setForm((x) => ({ ...x, coverImage: url }));
                  }}
                />
              </label>
            </div>
          </div>

          <div className="card p-4">
            <div className="text-xs font-semibold text-white/70">Flags</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <label className="pill cursor-pointer">
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                Published
              </label>
              <label className="pill cursor-pointer">
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Featured
              </label>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="text-xs font-semibold text-white/70">Gallery</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {form.images.map((src) => (
              <div key={src} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="img" className="h-16 w-24 rounded-xl object-cover opacity-90" />
                <button
                  className="absolute -left-2 -top-2 rounded-full border border-white/15 bg-black/70 px-2 py-1 text-xs"
                  onClick={() => setForm((x) => ({ ...x, images: x.images.filter((i) => i !== src) }))}
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
            <label className="btn cursor-pointer">
              <Upload className="h-4 w-4 text-neon-300/90" />
              {uploading ? "Uploading..." : "Add image"}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = await upload(f);
                  setForm((x) => ({ ...x, images: [...x.images, url] }));
                }}
              />
            </label>
          </div>
        </div>

        <button disabled={loading} className="btn btn-primary" onClick={save} type="button">
          {loading ? "Saving..." : "Save"}
          <Save className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
