"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, Download, Expand, X } from "lucide-react";
import { ScrollAnim } from "@/components/animations/ScrollAnim";
import { useLang } from "@/components/locale/LanguageProvider";
import { portfolioProjects } from "@/lib/portfolio";

const copy = {
  ar: {
    label: "أعمال مختارة من HAWK Studio",
    titleA: "منتجات رقمية",
    titleB: "صممناها وبنيناها.",
    intro: "هذه نماذج حقيقية من تطبيقاتنا. استعرض كل شاشة بشكل منفصل، ثم حمّل نسخة Android وجرب المنتج بنفسك.",
    products: "منتجان رقميان",
    screens: "21 شاشة",
    builds: "نسخ Android",
    overview: "نظرة عامة",
    features: "أبرز المزايا",
    gallery: "شاشات التطبيق",
    openImage: "فتح الصورة بحجم كامل",
    testBuild: "نسخة تجريبية بصيغة APK",
    notice: "قد يطلب Android السماح بالتثبيت من هذا المصدر.",
    nextTitle: "لديك فكرة تريد تحويلها إلى منتج واضح وقوي؟",
    nextButton: "ابدأ مشروعك معنا",
    close: "إغلاق الصورة",
  },
  en: {
    label: "Selected work by HAWK Studio",
    titleA: "Digital products",
    titleB: "designed and built by us.",
    intro: "Real products from our studio. Explore every screen independently, then download the Android build and try the product yourself.",
    products: "Two digital products",
    screens: "21 screens",
    builds: "Android builds",
    overview: "Overview",
    features: "Key features",
    gallery: "Application screens",
    openImage: "Open full-size image",
    testBuild: "APK test build",
    notice: "Android may ask you to allow installation from this source.",
    nextTitle: "Have an idea you want to turn into a clear, powerful product?",
    nextButton: "Start a project with us",
    close: "Close image",
  },
} as const;

export function WorkShowcase() {
  const { lang } = useLang();
  const c = copy[lang];
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeImage) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    closeRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
      previousFocus?.focus();
    };
  }, [activeImage]);

  return (
    <div className="work-page">
      <section className="container-x work-hero">
        <ScrollAnim>
          <div className="work-hero-grid">
            <div>
              <span className="eyebrow-text">{c.label}</span>
              <h1><span>{c.titleA}</span><strong>{c.titleB}</strong></h1>
            </div>
            <div className="work-hero-aside">
              <p>{c.intro}</p>
              <div className="work-stats" aria-label="Portfolio statistics">
                <span><b>02</b>{c.products}</span>
                <span><b>21</b>{c.screens}</span>
                <span><b>APK</b>{c.builds}</span>
              </div>
            </div>
          </div>
        </ScrollAnim>
      </section>

      <div className="work-projects">
        {portfolioProjects.map((project, projectIndex) => {
          const local = project[lang];
          return (
            <article className="work-project" id={project.slug} key={project.slug}>
              <div className="container-x work-project-grid">
                <ScrollAnim direction={projectIndex % 2 ? "left" : "right"} className="work-project-info">
                  <div className="work-project-sticky">
                    <div className="work-project-index"><span>0{projectIndex + 1}</span><i /></div>
                    <span className="work-project-eyebrow">{project.eyebrow}</span>
                    <h2>{project.title}</h2>
                    <p className="work-project-description">{local.description}</p>

                    <div className="work-project-meta">
                      <div><small>{c.overview}</small><b>{project.year} / {project.platform}</b></div>
                      <div><small>{c.features}</small><ul>{local.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
                    </div>

                    <a className="work-download" href={project.downloadUrl} download>
                      <span><Download /></span>
                      <span><strong>{local.download}</strong><small>{c.testBuild} · {project.size}</small></span>
                      <ArrowUpLeft className="rtl-arrow" />
                    </a>
                    <p className="work-download-notice">{c.notice}</p>
                  </div>
                </ScrollAnim>

                <ScrollAnim delay={0.08} className="work-gallery-wrap">
                  <div className="work-gallery-head"><span>{c.gallery}</span><b>{String(project.screenshots.length).padStart(2, "0")}</b></div>
                  <div className="work-gallery">
                    {project.screenshots.map((src, imageIndex) => (
                      <button
                        className={`work-screen ${imageIndex === 0 ? "is-featured" : ""}`}
                        type="button"
                        key={src}
                        onClick={() => setActiveImage({ src, alt: `${project.title} — ${imageIndex + 1}` })}
                        aria-label={`${c.openImage}: ${project.title} ${imageIndex + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} application screen ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 720px) 72vw, (max-width: 1100px) 34vw, 24vw"
                          quality={88}
                        />
                        <span className="work-screen-number">{String(imageIndex + 1).padStart(2, "0")}</span>
                        <span className="work-screen-expand"><Expand /></span>
                      </button>
                    ))}
                  </div>
                </ScrollAnim>
              </div>
            </article>
          );
        })}
      </div>

      <section className="container-x work-next-wrap">
        <ScrollAnim direction="zoom">
          <div className="work-next">
            <span>HAWK / NEXT PROJECT</span>
            <h2>{c.nextTitle}</h2>
            <Link href="/contact" className="button button-lime">{c.nextButton}<ArrowUpLeft className="rtl-arrow" /></Link>
          </div>
        </ScrollAnim>
      </section>

      {activeImage && (
        <div className="work-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt} onClick={() => setActiveImage(null)}>
          <button ref={closeRef} type="button" aria-label={c.close} onClick={() => setActiveImage(null)}><X /></button>
          <div className="work-lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Image src={activeImage.src} alt={activeImage.alt} fill sizes="90vw" quality={100} priority />
          </div>
        </div>
      )}
    </div>
  );
}
