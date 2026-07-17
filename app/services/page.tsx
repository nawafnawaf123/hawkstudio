"use client";

import Link from "next/link";
import { ArrowUpRight, Braces, Compass, MonitorSmartphone, Palette, Sparkles, Workflow } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";

const content = {
  ar: {
    eyebrow:"ماذا نصنع", title:"نحوّل الأفكار الجيدة إلى تجارب رقمية لا تبدو عادية.", desc:"من أول سؤال عن الشخصية إلى آخر تفصيلة في الواجهة، نعمل كفريق تصميم وتطوير واحد. لا فصل بين الشكل، الشعور، والأداء.",
    services:[["استراتيجية التجربة", "نرتّب الرسالة، المسار، والأولويات قبل أن يبدأ التصميم؛ حتى يعرف كل عنصر لماذا هو موجود."],["هوية وواجهات", "أنظمة بصرية وواجهات رقمية تمنح العلامة حضوراً واضحاً، أنيقاً، وسهل التذكّر."],["تطوير الويب", "تطوير مواقع سريعة، مرنة ومتجاوبة، مع عناية حقيقية بالتفاصيل والأداء."],["تفاعل وحركة", "Transitions وحركة تشرح وتوجه وتضيف إيقاعاً، لا مجرد زينة على الشاشة."],["تطبيقات Android وiOS", "تصميم وتطوير تطبيقات جوال عصرية وسلسة، متناسقة مع هوية العلامة وجاهزة للنمو والتطوير."],["تطوير مستمر", "نحافظ على اتساق التجربة بعد الإطلاق ونطوّرها حين تكبر الفكرة." ]],
    approach:"كيف نعمل", approachTitle:"نبدأ من المعنى. نصل إلى الحركة. وننتهي بتجربة تترك أثراً.", start:"ابدأ محادثة",
  },
  en: {
    eyebrow:"What we make", title:"We turn good ideas into digital experiences that do not feel ordinary.", desc:"From the first question of character to the final interface detail, we work as one design and development team. There is no separation between look, feeling, and performance.",
    services:[["Experience strategy", "We arrange the message, journey, and priorities before design begins, so every element knows why it exists."],["Identity & interface", "Visual systems and digital interfaces that give a brand a clear, refined, memorable presence."],["Web development", "Fast, flexible, responsive website development with genuine care for detail and performance."],["Interaction & motion", "Transitions and motion that explain, guide, and add rhythm—not decoration for its own sake."],["Android & iOS apps", "Modern, fluid mobile app design and development, aligned with the brand and ready to grow."],["Ongoing evolution", "We protect the consistency of the experience after launch and evolve it as the idea grows."]],
    approach:"How we work", approachTitle:"We start with meaning. Arrive at motion. And finish with an experience that leaves a trace.", start:"Start a conversation",
  },
} as const;
const icons=[Compass,Palette,Braces,Sparkles,MonitorSmartphone,Workflow];

export default function ServicesPage(){
 const {lang}=useLang(); const c=content[lang];
 return <div className="container-x py-16 md:py-24"><ScrollAnim><section className="services-hero"><span className="eyebrow-text">{c.eyebrow}</span><h1>{c.title}</h1><p>{c.desc}</p></section></ScrollAnim><section className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{c.services.map(([title,desc],i)=>{const Icon=icons[i];return <ScrollAnim key={title} delay={(i%3)*.08}><article className="service-detail-card"><span><Icon className="h-5 w-5" /></span><small>0{i+1}</small><h2>{title}</h2><p>{desc}</p></article></ScrollAnim>})}</section><ScrollAnim><section className="approach-strip mt-16"><div><span className="eyebrow-text">{c.approach}</span><h2>{c.approachTitle}</h2></div><Link className="btn btn-primary" href="/contact">{c.start}<ArrowUpRight className="h-4 w-4" /></Link></section></ScrollAnim></div>;
}
