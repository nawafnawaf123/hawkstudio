"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpLeft, MessageCircle, Phone } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";
import { MagneticLink } from "@/components/animations/MagneticLink";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  const { lang, t } = useLang();
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const phoneMenuRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!phoneMenuRef.current?.contains(event.target as Node)) setPhoneMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhoneMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const text = lang === "ar"
    ? { heading: "لنصنع حضوراً يصعب تجاهله.", intro: "مواقع وتطبيقات Android وiOS وتجارب رقمية للعلامات التي تريد أن تظهر بثقة.", top: "إلى الأعلى", rights: `جميع الحقوق محفوظة لدى ${site.name}.` }
    : { heading: "Let’s make a presence that is hard to ignore.", intro: "Websites, Android and iOS apps, and digital experiences for brands that want to show up with confidence.", top: "Back to top", rights: `All rights reserved by ${site.name}.` };

  return (
    <footer ref={footerRef} className={`site-footer ${footerVisible ? "is-motion-active" : ""}`}>
      <div className="footer-motion-bg" aria-hidden="true">
        <span className="footer-motion-grid" />
        <span className="footer-motion-aurora" />
        <strong>HAWK</strong>
      </div>
      <div className="footer-motion-marquee" aria-hidden="true">
        <div>
          <span>DESIGN</span><i /> <span>WEB</span><i /> <span>ANDROID</span><i /> <span>iOS</span><i /> <span>CODE</span><i /> <span>MOTION</span><i />
          <span>DESIGN</span><i /> <span>WEB</span><i /> <span>ANDROID</span><i /> <span>iOS</span><i /> <span>CODE</span><i /> <span>MOTION</span><i />
        </div>
      </div>
      <div className="container-x">
        <ScrollAnim><div className="footer-heading">
          <div><span>HAWK / DIGITAL STUDIO</span><h2>{text.heading}</h2></div>
          <MagneticLink
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="footer-round-link"
            aria-label={lang === "ar" ? "تواصل مع Hawk Studio عبر واتساب" : "Contact Hawk Studio on WhatsApp"}
          >
            <ArrowUpLeft className="rtl-arrow" />
          </MagneticLink>
        </div></ScrollAnim>
        <ScrollAnim delay={0.08}><div className="footer-grid">
          <p>{text.intro}</p>
          <div className="footer-nav">
            <Link href="/services" prefetch={false}>{t("nav.services")}</Link><Link href="/about" prefetch={false}>{t("nav.about")}</Link><Link href="/contact" prefetch={false}>{t("nav.contact")}</Link>
          </div>
          <div className="footer-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className="footer-phone-menu" ref={phoneMenuRef}>
              <button
                type="button"
                className="footer-phone-trigger"
                aria-expanded={phoneMenuOpen}
                aria-controls="footer-phone-options"
                onClick={() => setPhoneMenuOpen((open) => !open)}
              >
                {site.phone}
              </button>
              <div id="footer-phone-options" className={`footer-phone-popover ${phoneMenuOpen ? "is-open" : ""}`}>
                <a href={`tel:${site.phoneHref}`} onClick={() => setPhoneMenuOpen(false)}>
                  <span><Phone /></span><div><strong>{lang === "ar" ? "اتصال عادي" : "Phone call"}</strong><small>{site.phone}</small></div>
                </a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" onClick={() => setPhoneMenuOpen(false)}>
                  <span><MessageCircle /></span><div><strong>WhatsApp</strong><small>{site.phone}</small></div>
                </a>
              </div>
            </div>
          </div>
        </div></ScrollAnim>
        <div className="footer-bottom">
          <div className="footer-rights">
            <span>© {new Date().getFullYear()} HAWK STUDIO</span>
            <small>{text.rights}</small>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{text.top} ↑</button>
        </div>
      </div>
    </footer>
  );
}
