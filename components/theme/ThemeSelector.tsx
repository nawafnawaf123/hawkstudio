"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";

type Theme = "light" | "dark";

export function ThemeSelector() {
  const { lang } = useLang();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("hawk-theme");
    const active: Theme = saved === "dark" ? "dark" : "light";
    setTheme(active);
    document.documentElement.dataset.theme = active;
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    const update = () => {
      setTheme(next);
      document.documentElement.dataset.theme = next;
    };
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };
    doc.startViewTransition ? doc.startViewTransition(update) : update();
    localStorage.setItem("hawk-theme", next);
  }

  const label = theme === "light"
    ? (lang === "ar" ? "تفعيل الوضع الداكن" : "Switch to dark mode")
    : (lang === "ar" ? "تفعيل الوضع الفاتح" : "Switch to light mode");

  return (
    <button type="button" className="theme-switch" onClick={toggleTheme} aria-label={label} title={label}>
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
