"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import { LanguageSelector } from "@/components/locale/LanguageSelector";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { useLang } from "@/components/locale/LanguageProvider";
import { whatsappLink } from "@/lib/site";

const links = [
  ["/services", "nav.services"],
  ["/why-us", "nav.whyus"],
  ["/about", "nav.about"],
  ["/contact", "nav.contact"],
] as const;

export function Navbar() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const routes = ["/", ...links.map(([href]) => href)];
    const timer = window.setTimeout(() => {
      routes.forEach((href) => router.prefetch(href));
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="container-x nav-shell">
          <Link href="/" prefetch={false} className="wordmark" aria-label="Hawk Studio home">
            <span className="wordmark-symbol" aria-hidden="true">
              <span className="header-logo-crop">
                <Image src="/brand/logo_light.png" alt="" fill sizes="96px" quality={100} loading="eager" className="header-logo-image theme-asset-dark" />
                <Image src="/brand/logo_dark.png" alt="" fill sizes="96px" quality={100} loading="eager" className="header-logo-image theme-asset-light" />
              </span>
            </span>
            <span>HAWK<small>STUDIO</small></span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([href, key]) => (
              <Link
                href={href}
                prefetch={false}
                key={href}
                onPointerEnter={() => router.prefetch(href)}
                onFocus={() => router.prefetch(href)}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <LanguageSelector />
            <ThemeSelector />
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="nav-cta">
              {t("nav.requestProject")}<ArrowUpLeft className="h-4 w-4 rtl-arrow" />
            </a>
            <button className="mobile-menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} data-dir={lang}>
        <div className="mobile-menu-top">
          <span className="mobile-menu-label">HAWK / MENU</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
        </div>
        <nav>
          {links.map(([href, key], index) => (
            <Link href={href} prefetch={false} key={href} onClick={() => setOpen(false)}>
              <small>0{index + 1}</small><span>{t(key)}</span><ArrowUpLeft className="rtl-arrow" />
            </Link>
          ))}
        </nav>
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="mobile-menu-cta">{t("nav.contactNow")}</a>
      </div>
    </>
  );
}
