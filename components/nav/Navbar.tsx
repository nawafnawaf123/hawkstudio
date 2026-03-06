"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  LayoutGrid,
  Info,
  Wrench,
  Phone,
  BadgeHelp,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type PublicSettings } from "@/lib/settings";

const navItems = [
  { href: "/portfolio", icon: LayoutGrid, label: "الأعمال" },
  { href: "/services", icon: Wrench, label: "الخدمات" },
  { href: "/why-us", icon: BadgeHelp, label: "لماذا نحن" },
  { href: "/about", icon: Info, label: "من نحن" },
  { href: "/contact", icon: Phone, label: "تواصل" },
];

const NavLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
    )}
  >
    <Icon className="h-4 w-4 text-neon-300/90" />
    <span>{label}</span>
  </Link>
);

export function Navbar({ settings }: { settings: PublicSettings }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-neon-500/10 blur-xl opacity-0 transition group-hover:opacity-100" />
              <div className="card relative flex h-10 w-10 items-center justify-center">
                <Sparkles className="h-5 w-5 text-neon-300" />
              </div>
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold">{settings.siteName}</div>
              <div className="text-[11px] text-white/60">Studio</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/contact" className="btn btn-primary">
              تواصل الآن
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/contact" className="btn btn-primary px-3">
              تواصل
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open Menu"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neon-500/20 bg-white/5 text-white shadow-soft transition hover:border-neon-500/40 hover:bg-white/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-neon-500/10 blur-xl" />
              <Menu className="relative h-5 w-5 text-neon-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Mobile luxury sidebar */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-[60] h-screen w-[88vw] max-w-[380px] border-l border-white/10 bg-[#07110c]/95 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,111,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,240,111,0.08),transparent_35%)]" />
        <div className="absolute inset-0 grid-overlay opacity-20" />

        {/* ✅ هذا الجزء صار قابل للسكرول */}
        <div className="relative flex h-full min-h-0 flex-col">
          {/* top */}
          <div className="shrink-0 border-b border-white/10 px-5 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="card relative flex h-11 w-11 items-center justify-center">
                  <Sparkles className="h-5 w-5 text-neon-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {settings.siteName}
                  </div>
                  <div className="text-[11px] text-white/55">
                    Navigation Panel
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-neon-500/30 hover:bg-white/10"
              >
                <X className="h-5 w-5 text-neon-300" />
              </button>
            </div>
          </div>

          {/* ✅ المحتوى الداخلي قابل للتمرير */}
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-5 pt-5 [scrollbar-width:thin] [scrollbar-color:rgba(0,240,111,0.35)_transparent]">
            {/* intro */}
            <div className="relative px-1">
              <div className="rounded-3xl border border-neon-500/15 bg-white/5 p-4 shadow-glow">
                <div className="text-xs tracking-widest text-neon-300/90">
                  HAWK STUDIO
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  تنقل بسرعة بين الصفحات
                </div>
                <div className="mt-1 text-xs leading-6 text-white/60">
                  واجهة هاتف أنيقة ومريحة، مصممة لتناسب هوية الموقع بشكل فاخر.
                </div>
              </div>
            </div>

            {/* links */}
            <div className="mt-5 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white/85 transition hover:border-neon-500/30 hover:bg-neon-500/10 hover:shadow-glow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 transition group-hover:border-neon-500/25 group-hover:bg-neon-500/10">
                        <Icon className="h-5 w-5 text-neon-300" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-[11px] text-white/45">
                          افتح الصفحة
                        </div>
                      </div>
                    </div>

                    <ChevronLeft className="h-4 w-4 text-white/35 transition group-hover:text-neon-300" />
                  </Link>
                );
              })}
            </div>

            {/* bottom actions */}
            <div className="mt-5 px-1">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary h-12 w-full"
              >
                تواصل الآن
              </Link>
            </div>

            {/* مساحة أخيرة بسيطة */}
            <div className="h-4" />
          </div>
        </div>
      </aside>
    </>
  );
}