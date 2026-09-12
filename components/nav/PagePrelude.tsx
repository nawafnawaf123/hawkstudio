"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/locale/LanguageProvider";

const sections: Record<string, [string, string, string]> = {
  "/work": ["01", "SELECTED WORK", "الأعمال"],
  "/services": ["02", "OUR EXPERTISE", "خبراتنا"],
  "/why-us": ["03", "THE DIFFERENCE", "ما يميزنا"],
  "/about": ["04", "THE STUDIO", "الاستوديو"],
  "/contact": ["05", "LET’S BEGIN", "البداية"],
};

export function PagePrelude() {
  const pathname = usePathname();
  const { lang } = useLang();
  const section = sections[pathname] ?? (pathname.startsWith("/projects/") ? ["01", "PROJECT JOURNAL", "تفاصيل المشروع"] : null);
  if (!section) return null;
  return <div className="page-prelude container-x"><div><Link href="/">HAWK STUDIO</Link><span>/</span><span>{lang === "ar" ? section[2] : section[1]}</span></div><span>{section[0]} — {section[1]}</span></div>;
}
