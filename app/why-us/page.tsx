"use client";

import Link from "next/link";
import { ArrowUpRight, Gauge, Layers3, MousePointer2, ShieldCheck, Sparkles, Waypoints } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";

const content = {
  ar: { eyebrow: "لماذا Hawk", title: "لأن التميّز لا يعني أن نضيف أكثر. بل أن نختار أفضل.", desc: "نصمّم المشهد كاملاً: ما تقوله العلامة، كيف تشعر الواجهة، وكيف تعمل تحت السطح. النتيجة تجربة تبدو واثقة بقدر ما هي سلسة.", cards: [["وضوح بصري", "نحوّل الرسالة إلى نظام بصري يوجّه العين ويقود الانتباه بدون ضجيج."], ["حركة مقصودة", "لا حركة للزينة. كل انتقال يدعم السرد ويجعل التفاعل أكثر حياة."], ["أداء حقيقي", "واجهات خفيفة وسريعة لأن أول انطباع يجب أن يصل بلا انتظار."], ["نظام قابل للنمو", "نضع أساساً منظماً يساعد حضورك الرقمي على التوسع بثقة."], ["تركيز على الإنسان", "نتخذ كل قرار من منظور الشخص الذي سيستخدم التجربة، لا من منظور التقنية فقط."], ["تنفيذ دقيق", "من الفكرة إلى التفاصيل الأخيرة، نبقى قريبين من الرؤية التي اتفقنا عليها."]], cta: "لنتحدث عن فكرتك" },
  en: { eyebrow: "Why Hawk", title: "Because distinction is not adding more. It is choosing better.", desc: "We design the whole scene: what the brand says, how the interface feels, and how it works beneath the surface. The result is an experience that feels as confident as it is effortless.", cards: [["Visual clarity", "We turn the message into a visual system that guides the eye without creating noise."], ["Purposeful motion", "No movement for decoration. Every transition supports the story and makes interaction feel alive."], ["True performance", "Light, fast interfaces—because a first impression should arrive without waiting."], ["A system that grows", "We establish an ordered foundation for your digital presence to expand with confidence."], ["Human focus", "Every decision starts from the person using the experience, not the technology alone."], ["Careful execution", "From the first thought to the final detail, we stay close to the vision we agreed on."]], cta: "Talk through your idea" },
} as const;
const icons = [Sparkles, MousePointer2, Gauge, Layers3, Waypoints, ShieldCheck];

export default function WhyUsPage() {
  const { lang } = useLang(); const c = content[lang];
  return <div className="container-x py-16 md:py-24"><ScrollAnim><section className="why-hero"><span className="eyebrow-text">{c.eyebrow}</span><h1>{c.title}</h1><p>{c.desc}</p></section></ScrollAnim><section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.cards.map(([title, desc], i) => {const Icon=icons[i]; return <ScrollAnim key={title} delay={(i % 3) * .08}><article className="why-card"><span className="why-icon"><Icon className="h-5 w-5" /></span><span className="why-index">0{i + 1}</span><h2>{title}</h2><p>{desc}</p></article></ScrollAnim>})}</section><ScrollAnim><div className="why-cta mt-14"><div><span className="eyebrow-text">HAWK / YOUR NEXT MOVE</span><h2>{lang === "ar" ? "الفكرة القوية تستحق تجربة توازيها." : "A strong idea deserves an experience to match."}</h2></div><Link href="/contact" className="btn btn-primary">{c.cta}<ArrowUpRight className="h-4 w-4" /></Link></div></ScrollAnim></div>;
}
