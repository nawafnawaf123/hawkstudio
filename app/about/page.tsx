"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, Eye, HeartHandshake, Lightbulb, Shapes } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";

const content = {
  ar: {
    eyebrow: "عن Hawk Studio", title: "استوديو صغير في الحجم. واسع في الأثر.",
    lead: "نحن نؤمن أن الموقع أو التطبيق لا يجب أن يكون مجرد أداة؛ بل يجب أن يكون لحظة يشعر فيها الشخص بوضوح علامتك وثقتها وطموحها.",
    body: "لهذا نعمل عند المساحة التي يلتقي فيها التفكير الاستراتيجي مع التصميم الحساس والهندسة المتقنة. نزيل الضوضاء، نُظهر الفكرة، ونصنع تجربة يسهل تذكّرها.",
    values: [["الرؤية أولاً", "نبدأ بما تريد أن يقوله حضورك الرقمي قبل اختيار أي لون أو حركة."], ["تفاصيل محسوبة", "كل تباعد، انتقال وتفاعل موجود ليخدم شعوراً أو قراراً."], ["شراكة واضحة", "نتحدث بلغة مفهومة، نشاركك الخطوات، ونحمي جوهر الفكرة."], ["تقنية خفيفة", "نكتب واجهات سريعة ونظيفة؛ لأن الإبهار الحقيقي لا يثقل التجربة."]],
    manifesto: "نحن لا نلاحق التريند. نبحث عن الشيء الذي يجعل علامتك تبدو هي نفسها، بأفضل نسخة ممكنة.", cta: "لنصنع شيئاً واضحاً وجريئاً",
  },
  en: {
    eyebrow: "About Hawk Studio", title: "Small in size. Wide in impact.",
    lead: "We believe a website or mobile app should not be a mere tool. It should be a moment where someone feels your brand’s clarity, confidence, and ambition.",
    body: "That is why we work where strategic thinking meets sensitive design and careful engineering. We remove the noise, reveal the idea, and create an experience people can easily recall.",
    values: [["Vision first", "We begin with what your digital presence needs to say before choosing a colour or a motion."], ["Intentional detail", "Every space, transition, and interaction exists to serve a feeling or a decision."], ["Clear partnership", "We speak plainly, share the process, and protect the heart of the idea."], ["Lightweight technology", "We write fast, clean interfaces—because genuine impact should never make an experience heavy."]],
    manifesto: "We do not chase trends. We find the thing that makes your brand unmistakably itself, at its strongest.", cta: "Let’s make something clear and bold",
  },
} as const;
const icons = [Compass, Eye, HeartHandshake, Lightbulb];

export default function AboutPage() {
  const { lang } = useLang(); const c = content[lang];
  return <div className="container-x py-16 md:py-24">
    <ScrollAnim><section className="about-hero"><span className="eyebrow-text">{c.eyebrow}</span><h1>{c.title}</h1><p className="about-lead">{c.lead}</p><p className="about-body">{c.body}</p></section></ScrollAnim>
    <section className="mt-16 grid gap-4 md:grid-cols-2">
      {c.values.map(([title, desc], i) => { const Icon = icons[i]; return <ScrollAnim key={title} direction={i % 2 ? "left" : "right"} delay={i * .08}><article className="value-card"><span><Icon className="h-5 w-5" /></span><h2>{title}</h2><p>{desc}</p></article></ScrollAnim>; })}
    </section>
    <ScrollAnim direction="zoom"><section className="manifesto mt-16"><Shapes className="h-8 w-8 text-neon-300" /><blockquote>“{c.manifesto}”</blockquote><Link href="/contact" className="btn btn-primary mt-7">{c.cta}<ArrowUpRight className="h-4 w-4" /></Link></section></ScrollAnim>
  </div>;
}
