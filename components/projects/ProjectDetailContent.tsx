"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpLeft } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";
import { GlassButton } from "@/components/ui/GlassButton";
import { ProjectArtwork } from "@/components/projects/ProjectArtwork";
import type { StudioProject } from "@/lib/projects";

const labels = {
  ar: {
    selected: "مشروع مختار",
    overview: "نظرة عامة",
    challenge: "التحدي",
    solution: "الحل",
    result: "النتيجة",
    capabilities: "الخدمات",
    next: "المشروع التالي",
    start: "ابدأ مشروعك",
    back: "العودة إلى المشاريع",
  },
  en: {
    selected: "Selected project",
    overview: "Overview",
    challenge: "Challenge",
    solution: "Solution",
    result: "Outcome",
    capabilities: "Capabilities",
    next: "Next project",
    start: "Start your project",
    back: "Back to projects",
  },
} as const;

export function ProjectDetailContent({ project, nextProject }: { project: StudioProject; nextProject: StudioProject }) {
  const { lang } = useLang();
  const c = project.copy[lang];
  const next = nextProject.copy[lang];
  const l = labels[lang];

  return (
    <article className="project-detail-page">
      <section className="project-detail-hero container-x">
        <div className="project-detail-grid">
          <div className="project-detail-heading">
            <span className="section-kicker"><b>{project.number}</b>{l.selected}</span>
            <h1>{c.title}</h1>
            <p>{c.summary}</p>
            <div className="project-detail-actions">
              <GlassButton href="/contact" tone="lime">{l.start}<ArrowUpLeft className="rtl-arrow" /></GlassButton>
              <Link href="/#projects" className="project-back-link">{l.back}<ArrowDown /></Link>
            </div>
          </div>
          <div className="project-detail-visual" data-cursor="view">
            <ProjectArtwork visual={project.visual} priority />
            <span>{project.year} / {c.category}</span>
          </div>
        </div>
      </section>

      <section className="project-detail-story container-x">
        <ScrollAnim>
          <div className="project-overview">
            <span className="section-kicker"><b>01</b>{l.overview}</span>
            <p>{c.summary}</p>
          </div>
        </ScrollAnim>
        <div className="project-story-grid">
          {([
            [l.challenge, c.challenge],
            [l.solution, c.solution],
            [l.result, c.result],
          ] as const).map(([title, body], index) => (
            <ScrollAnim key={title} delay={index * 0.07} direction={index % 2 ? "up" : "right"}>
              <section className="project-story-card">
                <span>0{index + 1}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </section>
            </ScrollAnim>
          ))}
        </div>
      </section>

      <section className="project-capabilities container-x">
        <ScrollAnim>
          <div>
            <span className="section-kicker"><b>02</b>{l.capabilities}</span>
            <div className="project-capability-list">
              {c.capabilities.map((capability, index) => <span key={capability}>0{index + 1} / {capability}</span>)}
            </div>
          </div>
        </ScrollAnim>
      </section>

      <section className="project-next container-x">
        <ScrollAnim direction="zoom">
          <Link href={`/projects/${nextProject.slug}`} prefetch={false} data-cursor="view">
            <span>{l.next} / {nextProject.number}</span>
            <h2>{next.title}</h2>
            <ArrowUpLeft className="rtl-arrow" />
          </Link>
        </ScrollAnim>
      </section>
    </article>
  );
}
