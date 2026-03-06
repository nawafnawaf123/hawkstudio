import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/contact/ContactForm";
import { getPublicSettings } from "@/lib/settings";
import { Mail, Phone, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const s = await getPublicSettings();
  const wa = s.contactWhatsApp?.replace(/\s+/g, "");
  const waLink = wa ? `https://wa.me/${wa.replace(/^\+/, "")}` : null;

  return (
    <div className="container-x py-10">
      <SectionTitle
        eyebrow="CONTACT"
        title="تواصل معنا"
        desc="اكتب التفاصيل وسنرجع لك بسرعة."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="card p-6">
            <ContactForm />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="text-sm font-semibold">معلومات التواصل</div>

            <div className="mt-4 space-y-3 text-sm text-white/75">
              <InfoRow icon={Phone} label="الهاتف" value={s.contactPhone} href={s.contactPhone ? `tel:${s.contactPhone}` : undefined} />
              <InfoRow icon={Mail} label="الإيميل" value={s.contactEmail} href={s.contactEmail ? `mailto:${s.contactEmail}` : undefined} />
              <InfoRow icon={MessageCircle} label="واتساب" value={s.contactWhatsApp} href={waLink || undefined} />
            </div>

            <div className="mt-6 card p-4">
              <div className="text-xs font-semibold text-white/80">ملاحظة</div>
              <div className="mt-1 text-xs text-white/60">
                يمكنك إدارة كل شيء من لوحة الإدارة: إضافة أعمال، تغيير البيانات، وتفعيل الصيانة.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="card flex h-10 w-10 items-center justify-center">
        <Icon className="h-5 w-5 text-neon-300" />
      </div>
      <div>
        <div className="text-xs text-white/55">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a className="block rounded-xl p-2 transition hover:bg-white/5" href={href} target={href.startsWith("http") ? "_blank" : undefined}>
      {content}
    </a>
  ) : (
    <div className="rounded-xl p-2">{content}</div>
  );
}
