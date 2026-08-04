"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { ScrollAnim } from "@/components/animations/ScrollAnim";
import { useLang } from "@/components/locale/LanguageProvider";
import { portfolioProjects } from "@/lib/portfolio";

const copy = {
  ar: {
    label: "أعمال مختارة",
    title: "منتجات حقيقية، وليست مجرد تصاميم على الشاشة.",
    body: "استعرض التطبيقات التي صممناها وبرمجناها، شاهد جميع الشاشات، وحمّل نسخة التجربة مباشرة.",
    action: "شاهد كل الأعمال",
    open: "استعرض المشروع",
  },
  en: {
    label: "Selected work",
    title: "Real products, not just designs on a screen.",
    body: "Explore the applications we designed and built, see every screen, and download a test build directly.",
    action: "View all work",
    open: "Explore project",
  },
} as const;

export function WorkPreview() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="home-work-section">
      <div className="container-x">
        <ScrollAnim direction="left">
          <div className="home-work-heading">
            <div><div className="section-kicker"><span>03</span>{c.label}</div><h2>{c.title}</h2></div>
            <div><p>{c.body}</p><Link href="/work" className="text-link">{c.action}<ArrowUpLeft className="rtl-arrow" /></Link></div>
          </div>
        </ScrollAnim>
        <div className="home-work-grid">
          {portfolioProjects.map((project, index) => (
            <ScrollAnim key={project.slug} direction={index ? "left" : "right"} delay={index * 0.08}>
              <Link href={`/work#${project.slug}`} className="home-work-card">
                <div className="home-work-image"><Image src={project.cover} alt={`${project.title} preview`} fill sizes="(max-width: 800px) 100vw, 50vw" quality={88} /></div>
                <div className="home-work-card-copy"><span>0{index + 1} / {project.year}</span><h3>{project.title}</h3><p>{project[lang].description}</p><b>{c.open}<ArrowUpLeft className="rtl-arrow" /></b></div>
              </Link>
            </ScrollAnim>
          ))}
        </div>
      </div>
    </section>
  );
}
