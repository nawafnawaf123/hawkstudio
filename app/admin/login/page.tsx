"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toaster";
import { Lock, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      window.location.href = "/admin/projects";
    } else {
      toast({ title: "فشل الدخول", description: "تحقق من الإيميل/الرقم السري" });
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <div className="flex items-center gap-3">
          <div className="card flex h-11 w-11 items-center justify-center">
            <Lock className="h-5 w-5 text-neon-300" />
          </div>
          <div>
            <div className="text-base font-semibold">Admin Login</div>
            <div className="text-xs text-white/60">Hawk Studio CMS</div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-3">
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button disabled={loading} className="btn btn-primary">
            {loading ? "..." : "Login"}
            <LogIn className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-4 text-xs text-white/55">
          بعد أول تشغيل: غير كلمة المرور من قاعدة البيانات أو أضف صفحة تغيير لاحقًا.
        </div>
      </div>
    </div>
  );
}
