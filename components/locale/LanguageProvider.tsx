"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, string>;

export const translations: Record<Lang, Dict> = {
  ar: {
    "nav.services": "الخدمات",
    "nav.whyus": "لماذا Hawk",
    "nav.about": "عن الاستوديو",
    "nav.contact": "تواصل",
    "nav.contactNow": "ابدأ محادثة",
    "nav.requestProject": "ابدأ مشروعك",
    "footer.links": "استكشف",
    "footer.contact": "تواصل معنا",
    "footer.phone": "الهاتف",
    "footer.email": "البريد",
  },
  en: {
    "nav.services": "Services",
    "nav.whyus": "Why Hawk",
    "nav.about": "The Studio",
    "nav.contact": "Contact",
    "nav.contactNow": "Start a conversation",
    "nav.requestProject": "Start a project",
    "footer.links": "Explore",
    "footer.contact": "Talk to us",
    "footer.phone": "Phone",
    "footer.email": "Email",
  },
};

type LangCtx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangCtx>({
  lang: "ar",
  dir: "rtl",
  t: (key) => translations.ar[key] || key,
  setLang: () => {},
  toggle: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = localStorage.getItem("hawk-lang") as Lang | null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    const update = () => setLangState(next);
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };
    doc.startViewTransition ? doc.startViewTransition(update) : update();
    localStorage.setItem("hawk-lang", next);
  }, []);

  const toggle = useCallback(() => setLang(lang === "ar" ? "en" : "ar"), [lang, setLang]);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = useCallback((key: string) => translations[lang][key] || key, [lang]);

  return <LangContext.Provider value={{ lang, dir, t, setLang, toggle }}>{children}</LangContext.Provider>;
}
