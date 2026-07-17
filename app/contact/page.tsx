"use client";

import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { site, whatsappLink } from "@/lib/site";

export default function ContactPage() {
  const { lang } = useLang();
  const c = lang === "ar" ? { eyebrow:"ابدأ المحادثة", title:"لنحوّل الفكرة إلى حضور يصعب تجاهله.", desc:"اختر وسيلة التواصل التي تناسبك. لا توجد نماذج تحفظ بياناتك هنا—فقط بداية محادثة مباشرة وواضحة.", direct:"تواصل مباشر", note:"أخبرنا عن فكرتك، المجال، وما الذي تريد أن يشعر به جمهورك." } : { eyebrow:"Start the conversation", title:"Let’s turn the idea into a presence that is hard to ignore.", desc:"Choose the channel that suits you. There are no forms collecting your data here—just a direct, clear conversation.", direct:"Direct contact", note:"Tell us about the idea, the space you are in, and how you want your audience to feel." };
  const items = [
    { icon: Phone, label:lang === "ar" ? `اتصال عادي — ${site.phone}` : `Phone call — ${site.phone}`, value:lang === "ar" ? "اتصل بنا مباشرة" : "Call us directly", href:`tel:${site.phoneHref}` },
    { icon: MessageCircle, label:`WhatsApp — ${site.phone}`, value:lang === "ar" ? "افتح محادثة واتساب فوراً" : "Open a WhatsApp conversation instantly", href:whatsappLink },
    { icon: Mail, label:site.email, value:lang === "ar" ? "أرسل تفاصيل فكرتك" : "Send us the shape of your idea", href:`mailto:${site.email}` },
  ];
  return <div className="container-x py-16 md:py-24"><section className="contact-hero"><span className="eyebrow-text">{c.eyebrow}</span><h1>{c.title}</h1><p>{c.desc}</p></section><div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_.8fr]"><div className="contact-list">{items.map(({icon:Icon,label,value,href},i)=><a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-option"><span><Icon className="h-6 w-6" /></span><div><strong>{label}</strong><p>{value}</p></div><Send className="ms-auto h-4 w-4 text-neon-300" /><small>0{i+1}</small></a>)}</div><aside className="contact-note"><div className="contact-note-icon"><MessageCircle className="h-6 w-6" /></div><span className="eyebrow-text">{c.direct}</span><h2>{c.note}</h2><p>{lang === "ar" ? "نردّ عليك عبر القناة التي تختارها، لنفهم الاتجاه ونرسم بداية مناسبة." : "We will reply through your chosen channel, understand the direction, and shape the right starting point."}</p></aside></div></div>;
}
