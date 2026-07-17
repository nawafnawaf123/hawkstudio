"use client";

import { useLang } from "./LanguageProvider";

export function LanguageSelector() {
  const { lang, toggle } = useLang();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className="language-switch"
    >
      <span>{lang === "ar" ? "EN" : "عربي"}</span>
    </button>
  );
}
