"use client";

import Link from "next/link";
import { ArrowUpRight, Braces, Compass, MonitorSmartphone, Palette, Sparkles, Workflow } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";

const content = {
  ar: {
    eyebrow:"ماذا نصنع", title:"نصمّم ونبرمج مواقع وتطبيقات تحوّل الفكرة إلى تجربة قوية.", desc:"من الاستراتيجية وتصميم UI/UX إلى برمجة الموقع أو تطبيق الجوال، نعمل كفريق واحد لصناعة منتج سريع، متجاوب، واضح وقابل للنمو.",
    services:[["استراتيجية التجربة", "نرتّب الرسالة، المسار، والأولويات قبل أن يبدأ التصميم؛ حتى يعرف كل عنصر لماذا هو موجود."],["هوية وواجهات UI/UX", "أنظمة بصرية وواجهات رقمية تمنح العلامة حضوراً واضحاً، أنيقاً، وسهل التذكّر."],["تصميم وبرمجة المواقع", "نطوّر مواقع شركات وصفحات هبوط وتجارب ويب سريعة، مرنة ومتجاوبة مع الهاتف والكمبيوتر."],["تفاعل وحركة", "Transitions وحركة تشرح وتوجه وتضيف إيقاعاً، لا مجرد زينة على الشاشة."],["برمجة تطبيقات Android وiOS", "تصميم وتطوير تطبيقات جوال عصرية وسلسة، متناسقة مع هوية العلامة وجاهزة للنمو والتطوير."],["تطوير وتحسين مستمر", "نحافظ على اتساق التجربة بعد الإطلاق، نراقب الأداء ونطوّر المنتج حين تكبر الفكرة." ]],
    seoLabel:"حلول البرمجة والتصميم", seoTitle:"استوديو واحد لبناء موقعك أو تطبيقك من الفكرة حتى الإطلاق.", seoBody:"يقدّم Hawk Studio خدمات تصميم المواقع وبرمجتها للشركات والعلامات والمشاريع الجديدة، من ترتيب المحتوى وتجربة المستخدم إلى تطوير واجهة سريعة ومتجاوبة تعمل بدقة على جميع الشاشات.", seoBody2:"كما نصمّم ونطوّر تطبيقات Android وiOS بهوية موحّدة، تدفّق استخدام واضح وأداء مدروس، مع إمكانية تطوير التجربة وتحسينها بعد الإطلاق.", topics:["تصميم مواقع", "برمجة مواقع", "تطوير الويب", "تطبيقات Android", "تطبيقات iOS", "تصميم UI/UX", "تحسين الأداء"],
    approach:"كيف نعمل", approachTitle:"نبدأ من المعنى. نصل إلى الحركة. وننتهي بتجربة تترك أثراً.", start:"ابدأ محادثة",
  },
  en: {
    eyebrow:"What we make", title:"We design and build websites and apps that turn ideas into strong digital products.", desc:"From strategy and UI/UX design to website or mobile app development, we work as one team to create a fast, responsive, clear product built to grow.",
    services:[["Experience strategy", "We arrange the message, journey, and priorities before design begins, so every element knows why it exists."],["Identity & UI/UX", "Visual systems and digital interfaces that give a brand a clear, refined, memorable presence."],["Website design & development", "We build fast, responsive company websites, landing pages, and web experiences for mobile and desktop."],["Interaction & motion", "Transitions and motion that explain, guide, and add rhythm—not decoration for its own sake."],["Android & iOS app development", "Modern, fluid mobile app design and development, aligned with the brand and ready to grow."],["Ongoing optimization", "We protect consistency after launch, monitor performance, and evolve the product as the idea grows."]],
    seoLabel:"Design & development solutions", seoTitle:"One studio to take your website or app from idea to launch.", seoBody:"Hawk Studio designs and develops websites for companies, brands, and new ventures—from content structure and user experience to a fast, responsive interface that works precisely across screens.", seoBody2:"We also design and develop Android and iOS apps with one coherent identity, a clear user flow, considered performance, and room to evolve after launch.", topics:["Web design", "Web development", "Responsive websites", "Android apps", "iOS apps", "UI/UX design", "Performance optimization"],
    approach:"How we work", approachTitle:"We start with meaning. Arrive at motion. And finish with an experience that leaves a trace.", start:"Start a conversation",
  },
} as const;
const icons=[Compass,Palette,Braces,Sparkles,MonitorSmartphone,Workflow];

export default function ServicesPage(){
 const {lang}=useLang(); const c=content[lang];
 return <div className="container-x py-16 md:py-24"><ScrollAnim><section className="services-hero"><span className="eyebrow-text">{c.eyebrow}</span><h1>{c.title}</h1><p>{c.desc}</p></section></ScrollAnim><section className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{c.services.map(([title,desc],i)=>{const Icon=icons[i];return <ScrollAnim key={title} delay={(i%3)*.08}><article className="service-detail-card"><span><Icon className="h-5 w-5" /></span><small>0{i+1}</small><h2>{title}</h2><p>{desc}</p></article></ScrollAnim>})}</section><ScrollAnim><section id="development-services" className="services-search-copy mt-16"><span className="eyebrow-text">{c.seoLabel}</span><div><h2>{c.seoTitle}</h2><p>{c.seoBody}</p><p>{c.seoBody2}</p><div className="services-topic-list">{c.topics.map((topic)=><span key={topic}>{topic}</span>)}</div></div></section></ScrollAnim><ScrollAnim><section className="approach-strip mt-16"><div><span className="eyebrow-text">{c.approach}</span><h2>{c.approachTitle}</h2></div><Link className="btn btn-primary" href="/contact">{c.start}<ArrowUpRight className="h-4 w-4" /></Link></section></ScrollAnim></div>;
}
