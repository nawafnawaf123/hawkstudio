"use client";

import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";

const questions = {
  ar: [
    ["من أين نبدأ؟", "نبدأ بمحادثة عن فكرتك وجمهورك والنتيجة التي تبحث عنها. بعدها نحدد نطاق العمل والمخرجات والخطوات المناسبة للمشروع."],
    ["هل يمكن تطوير موقع موجود؟", "بالتأكيد. نراجع التصميم وتجربة الاستخدام والأساس التقني، ثم نحدد ما يستحق الحفاظ عليه وما يحتاج إلى تطوير."],
    ["كم يستغرق المشروع؟", "تعتمد المدة على حجم المشروع وعدد الشاشات والتكاملات وجاهزية المحتوى. نحدد جدولًا واضحًا بعد الاتفاق على النطاق، ونشاركك التقدم خلال التنفيذ."],
    ["ماذا يحدث بعد الإطلاق؟", "نتفق على التسليم والتوثيق واحتياجات الصيانة والتحسين. ويمكن ترتيب خطة متابعة تناسب المرحلة القادمة من منتجك."],
  ],
  en: [
    ["Where do we start?", "With a conversation about your idea, audience, and the outcome you want. We then define the scope, deliverables, and a process that fits the project."],
    ["Can you improve an existing website?", "Absolutely. We review the design, user experience, and technical foundation to identify what to keep and where an upgrade will make the biggest difference."],
    ["How long does a project take?", "Timing depends on the scope, screens, integrations, and content readiness. We agree on a clear schedule once the scope is defined and share progress throughout the build."],
    ["What happens after launch?", "We agree on handover, documentation, and maintenance needs. An ongoing improvement plan can be arranged around the next stage of your product."],
  ],
};

export function StudioFAQ() {
  const { lang } = useLang();
  return <section className="studio-faq container-x">
    <ScrollAnim><div className="section-kicker"><span>05</span>{lang === "ar" ? "قبل أن نبدأ" : "Before we begin"}</div><h2>{lang === "ar" ? "كل تجربة قوية تبدأ بوضوح." : "Good things begin with clarity."}</h2><p>{lang === "ar" ? "بعض الإجابات، قبل أول محادثة." : "A few answers, before our first conversation."}</p></ScrollAnim>
    <div className="faq-list">{questions[lang].map(([question, answer], i) => <ScrollAnim key={i} delay={i * .04}><details name="studio-faq"><summary><span>0{i + 1}</span><h3>{question}</h3><span className="disclosure-plus" aria-hidden="true" /></summary><p>{answer}</p></details></ScrollAnim>)}</div>
  </section>;
}
