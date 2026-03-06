"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/components/ui/Toaster";
import { Send } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");

      toast({ title: "تم الإرسال ✅", description: "وصلتنا رسالتك وسنرد قريبًا." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message || "تعذر الإرسال" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          placeholder="الاسم"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="الإيميل"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <Input
        placeholder="رقم الهاتف (اختياري)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <Textarea
        placeholder="اكتب تفاصيل المشروع..."
        rows={7}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />

      <button disabled={loading} className="btn btn-primary">
        {loading ? "جاري الإرسال..." : "إرسال"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
