"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownLeft, ArrowUpLeft, Asterisk, Braces, MoveUpLeft, PenTool, Rocket, Search, Smartphone, Sparkles } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";

const copy = {
  ar: {
    label: "استوديو مستقل للتصميم والتطوير",
    heroA: "نصمّم",
    heroB: "حضوراً رقمياً",
    heroC: "لا يُنسى.",
    intro: "Hawk Studio يصنع مواقع ويب وتطبيقات Android وiOS وتجارب رقمية تجمع بين الفكرة الواضحة، التصميم الجريء، والبرمجة المتقنة.",
    start: "ابدأ مشروعك", discover: "اكتشف الاستوديو",
    ticker: ["استراتيجية", "هوية رقمية", "تصميم واجهات", "تطوير ويب", "تطبيقات Android وiOS", "حركة وتفاعل"],
    statementLabel: "نحن Hawk", statement: "لا نبني صفحات تملأ الشاشة. نبني تجربة تمنح علامتك صوتاً، شكلاً، وحضوراً.",
    statementBody: "من أول كلمة إلى آخر حركة، نربط التصميم بالتقنية لنصنع تجربة تبدو بسيطة، لكنها محسوبة بدقة.",
    serviceLabel: "ما الذي نتقنه", serviceTitle: "فكرة واحدة. فريق واحد. تجربة متكاملة.",
    services: [
      ["01", "الاستراتيجية والاتجاه", "نكتشف جوهر العلامة، نرتب الرسالة، ونحدد كيف يجب أن يشعر الجمهور عند أول لقاء."],
      ["02", "الهوية وتجربة المستخدم", "نصمم نظاماً بصرياً وواجهة واضحة تتحدث بلغة علامتك وتوجّه الانتباه بذكاء."],
      ["03", "التطوير الإبداعي", "نحوّل التصميم إلى موقع سريع ومتجاوب بحركة سلسة وتفاصيل تعمل بدقة على كل شاشة."],
      ["04", "تطبيقات Android وiOS", "نصمم ونطوّر تطبيقات جوال حديثة وسلسة، بهوية متناسقة وتجربة مدروسة من أول شاشة حتى الإطلاق."],
    ],
    processLabel: "كيف نعمل", processTitle: "من السؤال الصحيح إلى إطلاق واثق.",
    process: [["نفهم", "نبدأ بالهدف، الجمهور، والصورة التي تريد بناءها."], ["نشكّل", "نحوّل الاتجاه إلى لغة بصرية ونظام واضح."], ["نبني", "نطوّر التجربة، نختبرها، ونصقل كل تفصيلة."], ["نطلق", "نسلّم حضوراً سريعاً، مرناً، وجاهزاً للنمو."]],
    closeLabel: "المشروع القادم", closeTitle: "فكرتك تستحق أكثر من موقع أو تطبيق عادي.", closeButton: "لنتحدث عنها",
    stageTop: "WEB × MOBILE × CODE", stageBottom: "BEIRUT / WORLDWIDE", stageCaption: "Digital presence, made sharp.",
  },
  en: {
    label: "Independent design & development studio",
    heroA: "We design",
    heroB: "digital presence",
    heroC: "that stays.",
    intro: "Hawk Studio creates websites, Android and iOS apps, and digital experiences where clear thinking, bold design, and precise engineering meet.",
    start: "Start a project", discover: "Meet the studio",
    ticker: ["Strategy", "Digital identity", "Interface design", "Web development", "Android & iOS apps", "Motion & interaction"],
    statementLabel: "We are Hawk", statement: "We do not build pages that simply fill a screen. We build experiences that give your brand a voice, a shape, and a presence.",
    statementBody: "From the first word to the final movement, we connect design and technology to create an experience that feels simple because every detail is considered.",
    serviceLabel: "What we do best", serviceTitle: "One idea. One team. One complete experience.",
    services: [
      ["01", "Strategy & direction", "We uncover the brand at its core, sharpen the message, and define how the audience should feel at first contact."],
      ["02", "Identity & experience", "We design a visual system and a clear interface that speaks your brand’s language and guides attention with intent."],
      ["03", "Creative development", "We turn design into a fast, responsive website with fluid motion and precise detail on every screen."],
      ["04", "Android & iOS apps", "We design and build modern mobile apps with a coherent identity and a considered experience from the first screen to launch."],
    ],
    processLabel: "How we work", processTitle: "From the right question to a confident launch.",
    process: [["Understand", "We begin with the goal, the audience, and the perception you want to build."], ["Shape", "We turn direction into a visual language and a clear system."], ["Build", "We develop, test, and refine every part of the experience."], ["Launch", "We deliver a fast, flexible presence that is ready to grow."]],
    closeLabel: "The next project", closeTitle: "Your idea deserves more than an ordinary website or app.", closeButton: "Let’s talk about it",
    stageTop: "WEB × MOBILE × CODE", stageBottom: "BEIRUT / WORLDWIDE", stageCaption: "Digital presence, made sharp.",
  },
} as const;

const serviceIcons = [Sparkles, PenTool, Braces, Smartphone];
const processIcons = [Search, PenTool, Braces, Rocket];

export function HomeContent() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <div className="home-page">
      <section className="editorial-hero">
        <div className="container-x hero-layout">
          <div className="hero-copy">
            <div className="hero-label"><span /><span>{c.label}</span></div>
            <h1><span>{c.heroA}</span><strong>{c.heroB}</strong><span>{c.heroC}</span></h1>
            <div className="hero-copy-bottom">
              <p>{c.intro}</p>
              <div className="hero-actions">
                <Link href="/contact" className="button button-dark">{c.start}<ArrowUpLeft className="rtl-arrow" /></Link>
                <Link href="/about" className="text-link">{c.discover}<ArrowDownLeft className="rtl-arrow" /></Link>
              </div>
            </div>
          </div>

          <div className="hero-stage" role="img" aria-label="Hawk Studio brand mark">
            <Image
              src="/brand/website_light.png"
              alt=""
              fill
              priority
              quality={88}
              sizes="(max-width: 1024px) calc(100vw - 2.5rem), 38vw"
              className="hero-brand-image theme-asset-dark"
              draggable={false}
            />
            <Image
              src="/brand/website_dark.png"
              alt=""
              fill
              priority
              quality={88}
              sizes="(max-width: 1024px) calc(100vw - 2.5rem), 38vw"
              className="hero-brand-image theme-asset-light"
              draggable={false}
            />
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><div>{[...c.ticker, ...c.ticker, ...c.ticker, ...c.ticker, ...c.ticker, ...c.ticker].map((item, i) => <span key={`${item}-${i}`}>{item}<Asterisk /></span>)}</div></div>

      <section id="studio" className="statement-section container-x">
        <ScrollAnim direction="right" className="statement-reveal">
          <div className="statement-ambient" aria-hidden="true">
            <span className="statement-ambient-word">HAWK</span>
            <i className="statement-ambient-ring statement-ambient-ring-large" />
            <i className="statement-ambient-ring statement-ambient-ring-small" />
            <i className="statement-ambient-dot" />
            <span className="statement-ambient-label">DESIGN&nbsp;&nbsp;×&nbsp;&nbsp;CODE&nbsp;&nbsp;×&nbsp;&nbsp;MOTION</span>
            <span className="statement-ambient-line"><i /></span>
          </div>
          <div className="statement-grid">
            <div className="section-kicker"><span>01</span>{c.statementLabel}</div>
            <div className="statement-copy">
              <h2>{c.statement}</h2>
              <p>{c.statementBody}</p>
              <div className="statement-cta-row"><Link href="/about" className="circle-link" aria-label={c.discover}><MoveUpLeft className="rtl-arrow" /></Link><span>{c.discover}</span></div>
            </div>
          </div>
        </ScrollAnim>
      </section>

      <section className="services-section">
        <div className="container-x">
          <ScrollAnim direction="left"><div className="section-heading"><div className="section-kicker"><span>02</span>{c.serviceLabel}</div><h2>{c.serviceTitle}</h2></div></ScrollAnim>
          <div className="home-services-list">
            {c.services.map(([number, title, desc], i) => { const Icon = serviceIcons[i]; return <ScrollAnim key={number} direction={i % 2 ? "left" : "right"} delay={i * .06}><article className="home-service-row"><span className="service-row-number">{number}</span><span className="service-row-icon"><Icon /></span><h3>{title}</h3><p>{desc}</p><ArrowUpLeft className="service-row-arrow rtl-arrow" /></article></ScrollAnim> })}
          </div>
        </div>
      </section>

      <section id="process" className="process-section container-x">
        <ScrollAnim><div className="process-intro"><div className="section-kicker"><span>03</span>{c.processLabel}</div><h2>{c.processTitle}</h2></div></ScrollAnim>
        <ScrollAnim className="process-sequence">
          <div className="process-timeline">
            <div className="process-progress-head"><span>HAWK / WORKFLOW</span><span className="process-live"><i />{lang === "ar" ? "خطوة بخطوة" : "STEP BY STEP"}</span></div>
            <div className="process-progress" aria-hidden="true">
              <div className="process-progress-track"><i /></div>
              <div className="process-progress-nodes">{c.process.map((_, i) => <span className="process-node" key={i}><i /><b>0{i + 1}</b></span>)}</div>
            </div>
            <div className="process-grid">
              {c.process.map(([title, desc], i) => { const Icon = processIcons[i]; return (
                <article className="process-card" data-step={`0${i + 1}`} key={title}>
                  <div className="process-card-top"><span>0{i + 1}</span><span className="process-card-icon"><Icon /></span></div>
                  <div className="process-card-copy"><small>STEP / 0{i + 1}</small><h3>{title}</h3><p>{desc}</p></div>
                  <div className="process-card-meter"><i /></div>
                </article>
              ) })}
            </div>
          </div>
        </ScrollAnim>
      </section>

      <section className="container-x final-cta-wrap"><ScrollAnim direction="zoom"><div className="final-cta"><div className="final-cta-mark">H</div><div className="section-kicker light"><span>04</span>{c.closeLabel}</div><h2>{c.closeTitle}</h2><Link href="/contact" className="button button-lime">{c.closeButton}<ArrowUpLeft className="rtl-arrow" /></Link></div></ScrollAnim></section>
    </div>
  );
}
