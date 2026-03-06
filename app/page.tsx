// page.tsx (الصفحة الرئيسية) مع تحسين الأداء والصور
import Link from "next/link";
import Image from "next/image"; // استيراد Image من Next.js
import { prisma } from "@/lib/db";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  ArrowUpRight,
  Code2,
  Layers,
  PhoneCall,
  Sparkles,
  Rocket,
  ShieldCheck,
  Search,
  LayoutGrid,
  BadgeCheck,
  TimerReset,
  Wrench,
  Info,
  Smartphone,
  TabletSmartphone,
} from "lucide-react";

export const dynamic = "force-dynamic";

function safeJsonArray(v: any): string[] {
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  if (typeof v === "string") {
    try {
      const arr = JSON.parse(v);
      if (Array.isArray(arr)) return arr.filter(Boolean).map(String);
    } catch {}
  }
  return [];
}

export default async function HomePage() {
  const settings =
    (await prisma.setting.findFirst()) ?? {
      siteName: "Hawk Studio",
      siteDescription:
        "حلول برمجية احترافية بهوية Hawk تشمل المواقع والأنظمة والتطبيقات.",
      contactPhone: "+96170000000",
      contactWhatsApp: "+96170000000",
      contactEmail: "hello@hawk.studio",
      maintenanceMode: false,
    };

  const featuredRaw = await prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const featured = featuredRaw.map((p) => ({
    ...p,
    images: safeJsonArray((p as any).images),
    tech: safeJsonArray((p as any).tech),
  }));

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon-500/20 bg-neon-500/10 px-4 py-2 text-xs text-white/80 shadow-glow">
              <Sparkles className="h-4 w-4 text-neon-300" />
              {settings.siteName}
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              نبني مواقع وأنظمة
              <span className="text-neon-300"> وتطبيقات جوال </span>
              تليق بهوية مشروعك
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              {settings.siteDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/portfolio" className="btn btn-primary">
                استعرض أعمالنا <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn">
                خدماتنا <Layers className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn">
                ابدأ مشروعك <PhoneCall className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/65">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                <Code2 className="h-4 w-4 text-neon-300" />
                Web + Systems + Mobile Apps
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                <Smartphone className="h-4 w-4 text-neon-300" />
                Android & iOS
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                <span className="text-neon-300">📞</span>
                <span dir="ltr">{settings.contactPhone}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card overflow-hidden p-0">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-neon-500/20 via-ink-950/90 to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,111,0.22),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(0,240,111,0.12),transparent_28%)]" />
                <div className="absolute inset-0 grid-overlay opacity-20" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-neon-300/80">
                      HAWK
                    </div>
                    <div className="mt-2 text-3xl font-black text-white md:text-4xl">
                      STUDIO
                    </div>
                    <div className="mt-3 text-xs text-white/60">
                      Web × Systems × Mobile Apps
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/5 p-5 text-sm text-white/70">
                تصميم بصري قوي + تجربة مستخدم سينمائية + حلول رقمية متكاملة للمواقع والأنظمة والتطبيقات.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x pb-16">
        <SectionTitle
          eyebrow="SERVICES"
          title="خدماتنا"
          desc="كل ما يحتاجه مشروعك الرقمي في مكان واحد."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icon={Code2}
            title="تطوير مواقع"
            desc="مواقع احترافية سريعة ومهيأة لمحركات البحث وتناسب مختلف الأنشطة."
          />
          <InfoCard
            icon={TabletSmartphone}
            title="تطبيقات Android"
            desc="تطبيقات أندرويد حديثة، سريعة، وعملية تناسب فكرتك أو نشاطك التجاري."
          />
          <InfoCard
            icon={Smartphone}
            title="تطبيقات iOS"
            desc="تطبيقات iPhone و iPad بتجربة استخدام قوية وهوية بصرية احترافية."
          />
          <InfoCard
            icon={LayoutGrid}
            title="لوحات تحكم"
            desc="لوحات إدارة واضحة وسهلة للنشر والتحديث والمتابعة وإدارة المحتوى."
          />
          <InfoCard
            icon={Wrench}
            title="أنظمة خاصة"
            desc="تطوير أنظمة حسب الطلب تناسب طبيعة عملك بالضبط وتسهّل التشغيل."
          />
          <InfoCard
            icon={Search}
            title="SEO"
            desc="تهيئة للمحركات من البداية لزيادة الظهور والوصول وتحسين النتائج."
          />
          <InfoCard
            icon={Layers}
            title="واجهات احترافية"
            desc="تصميم واجهات عصرية ترفع قيمة العلامة التجارية وتعزز الثقة."
          />
          <InfoCard
            icon={PhoneCall}
            title="الدعم والتطوير"
            desc="استمرار في التحسين، التطوير، والإضافات بعد الإطلاق حسب الحاجة."
          />
          <InfoCard
            icon={BadgeCheck}
            title="حلول متكاملة"
            desc="ربط بين الموقع والنظام والتطبيق داخل تجربة واحدة متناسقة وقوية."
          />
        </div>

        <div className="mt-6">
          <Link href="/services" className="btn">
            عرض صفحة الخدمات <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* WHY US */}
      <section className="container-x pb-16">
        <SectionTitle
          eyebrow="WHY US"
          title="لماذا نحن"
          desc="لأننا لا نبني مجرد موقع أو تطبيق، بل نبني حضورًا رقميًا قويًا."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icon={Rocket}
            title="سرعة تنفيذ"
            desc="بنية جاهزة واحترافية تقلل الوقت وتسرع الانطلاق بدون تعقيد."
          />
          <InfoCard
            icon={ShieldCheck}
            title="ثبات وأمان"
            desc="معالجة جيدة للمشاكل الأساسية وثبات أفضل للموقع أو النظام أو التطبيق."
          />
          <InfoCard
            icon={Search}
            title="SEO قوي"
            desc="تهيئة للمحركات من البداية: Metadata و Sitemap و Robots."
          />
          <InfoCard
            icon={BadgeCheck}
            title="هوية احترافية"
            desc="تصميم متناسق مع هوية Hawk Studio الخضراء والسوداء بشكل فاخر."
          />
          <InfoCard
            icon={TimerReset}
            title="قابلية التطوير"
            desc="المشروع جاهز للتوسع لاحقًا سواء بإضافة خدمات أو مميزات جديدة."
          />
          <InfoCard
            icon={Info}
            title="تجربة واضحة"
            desc="كل شيء منظم وسهل للمستخدم وصاحب المشروع في نفس الوقت."
          />
        </div>

        <div className="mt-6">
          <Link href="/why-us" className="btn">
            عرض صفحة لماذا نحن <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container-x pb-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">الأعمال المميزة</h2>
            <p className="mt-1 text-xs text-white/60">
              أحدث المشاريع التي تم نشرها من لوحة الإدارة.
            </p>
          </div>

          <Link href="/portfolio" className="btn">
            عرض الكل <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="mt-6 card p-6 text-sm text-white/70">
            لا توجد مشاريع مميزة الآن — من لوحة الإدارة فعّل خيار Featured ثم احفظ.
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <div key={p.id} className="card overflow-hidden p-0">
                <div className="relative aspect-[16/10] bg-black/20">
                  <Image
                    src={p.coverImage || "/uploads/demo-1.png"}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-1 text-sm font-semibold text-white">
                        {p.title}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs text-white/60">
                        {p.summary}
                      </div>
                    </div>

                    <Link
                      href={`/portfolio/${encodeURIComponent(p.slug)}`}
                      className="btn btn-primary h-9 px-3"
                    >
                      تفاصيل
                    </Link>
                  </div>

                  {p.tech?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.slice(0, 4).map((t: string) => (
                        <span
                          key={t}
                          className="rounded-full border border-neon-500/20 bg-neon-500/10 px-3 py-1 text-[11px] text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container-x pb-20">
        <div className="card overflow-hidden p-0">
          <div className="relative bg-gradient-to-br from-neon-500/15 via-ink-950/90 to-black p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,240,111,0.18),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(0,240,111,0.08),transparent_35%)]" />
            <div className="relative">
              <div className="text-xs tracking-[0.3em] text-neon-300/85">
                START NOW
              </div>
              <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
                جاهز تبدأ مشروعك؟
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                إذا عندك فكرة لموقع، نظام، تطبيق Android، أو تطبيق iOS، تواصل معنا الآن وسنبدأ
                ببناء شيء يليق باسمك.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  تواصل الآن <PhoneCall className="h-4 w-4" />
                </Link>
                <Link href="/portfolio" className="btn">
                  شاهد الأعمال <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3">
        <div className="card flex h-11 w-11 items-center justify-center">
          <Icon className="h-5 w-5 text-neon-300" />
        </div>
        <div className="text-base font-semibold text-white">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-7 text-white/70">{desc}</div>
    </div>
  );
}