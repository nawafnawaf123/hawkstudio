import Link from "next/link";
import { Wrench, ArrowLeft, PhoneCall } from "lucide-react";
import { getPublicSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function MaintenancePage() {
  const s = await getPublicSettings();

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="container-x py-14 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="card overflow-hidden p-0">
            <div className="relative bg-gradient-to-br from-neon-500/20 via-ink-950/90 to-black p-10">
              <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_25%_25%,rgba(0,240,111,0.25),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(0,240,111,0.12),transparent_45%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-neon-500/20 bg-neon-500/10 px-4 py-2 text-xs text-white/85 shadow-glow">
                  <Wrench className="h-4 w-4 text-neon-300" />
                  وضع الصيانة مفعل
                </div>

                <h1 className="mt-5 text-2xl font-extrabold text-white md:text-3xl">
                  نعمل على تحديثات تجعل التجربة أفضل
                </h1>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  {s.siteName} تحت الصيانة مؤقتًا. سنعود خلال وقت قصير.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  

                  <Link href="/contact" className="btn btn-primary">
                    <PhoneCall className="h-4 w-4" />
                    تواصل الآن
                  </Link>
                </div>

                <div className="mt-6 text-xs text-white/60">
                  للتواصل السريع: <span dir="ltr">{s.contactPhone}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 p-6 text-sm text-white/70">
              ملاحظة: لوحة الإدارة تعمل طبيعي أثناء الصيانة لتحديث الأعمال والإعدادات.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}