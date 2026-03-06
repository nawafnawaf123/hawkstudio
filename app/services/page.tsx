// services/page.tsx (صفحة الخدمات) مع تحسينات الأداء والتجاوب
"use client";

import Link from "next/link";
import { useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import {
  Code2,
  Layers,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Store,
  Wrench,
  ArrowUpRight,
  TabletSmartphone,
  PanelsTopLeft,
  Database,
  Cpu,
  BellRing,
  Palette,
  Zap,
  CheckCircle2,
  AppWindow,
  MonitorSmartphone,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="container-x py-10">
      {/* Hero Section - Responsive Grid */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle
            eyebrow="SERVICES"
            title="خدمات Hawk Studio"
            desc="نطور مواقع احترافية، أنظمة مخصصة، ولوحات تحكم قوية، بالإضافة إلى تطبيقات Android و iOS بتجربة استخدام حديثة وهوية بصرية تليق بالمشروع."
          />

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Web Development</Badge>
            <Badge>Android Apps</Badge>
            <Badge>iOS Apps</Badge>
            <Badge>Dashboards</Badge>
            <Badge>Custom Systems</Badge>
            <Badge>SEO</Badge>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              ابدأ مشروعك <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/portfolio" className="btn">
              شاهد الأعمال <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <QuickFeature
              icon={TabletSmartphone}
              title="Android Apps"
              desc="واجهات حديثة وتجربة استخدام عملية."
            />
            <QuickFeature
              icon={Smartphone}
              title="iOS Apps"
              desc="تجربة أنيقة ومناسبة لهوية المشروع."
            />
            <QuickFeature
              icon={PanelsTopLeft}
              title="Dashboards"
              desc="لوحات تحكم سهلة وواضحة للإدارة."
            />
            <QuickFeature
              icon={Code2}
              title="Web Solutions"
              desc="مواقع احترافية سريعة وقابلة للتوسع."
            />
          </div>
        </div>

        {/* Phone Card - Responsive */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[40px] bg-neon-500/10 blur-3xl" />
          <div className="card relative overflow-hidden p-4 md:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,111,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,240,111,0.08),transparent_30%)]" />
            <div className="absolute inset-0 grid-overlay opacity-20" />

            {/* Responsive inner grid: column on mobile, row on large */}
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              {/* Left content */}
              <div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-5">
                  <div className="text-sm font-semibold text-white">
                    نطور أكثر من مجرد موقع
                  </div>
                  <div className="mt-2 text-xs leading-6 text-white/70 md:text-sm md:leading-7">
                    نقدم حلولًا متكاملة تشمل مواقع الشركات، الأنظمة الخاصة،
                    لوحات التحكم، وتطبيقات الجوال على Android و iOS ضمن تجربة
                    بصرية قوية وهوية احترافية.
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                  <GlassStat icon={AppWindow} title="واجهات عصرية" value="UI/UX" />
                  <GlassStat icon={BellRing} title="تنبيهات" value="Notifications" />
                  <GlassStat icon={ShieldCheck} title="أمان" value="Secure" />
                  <GlassStat icon={MonitorSmartphone} title="متعدد المنصات" value="Cross Platform" />
                </div>
              </div>

              {/* Phone - responsive sizing */}
              <div className="mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[240px] xl:max-w-[260px]">
                <InteractivePhone />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* باقي الأقسام (كما هي) */}
      <section className="mt-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Service
            icon={Code2}
            title="تطوير مواقع"
            items={[
              "مواقع شركات احترافية",
              "Landing Pages سريعة",
              "تهيئة SEO + سرعة",
              "ربط APIs ولوحات تحكم",
            ]}
          />
          <Service
            icon={TabletSmartphone}
            title="تطبيقات Android"
            items={[
              "واجهات حديثة وعملية",
              "تدفق استخدام واضح",
              "ربط API + Auth",
              "إشعارات وميزات حسب الطلب",
            ]}
          />
          <Service
            icon={Smartphone}
            title="تطبيقات iOS"
            items={[
              "تجربة استخدام راقية",
              "تصميم متوافق مع الهوية",
              "أداء سلس وثابت",
              "قابلية نشر وتطوير لاحقًا",
            ]}
          />
          <Service
            icon={PanelsTopLeft}
            title="لوحات تحكم"
            items={[
              "إدارة المحتوى بسهولة",
              "إدارة مشاريع/خدمات",
              "إعدادات وصيانة",
              "واجهة واضحة للأدمن",
            ]}
          />
          <Service
            icon={Store}
            title="أنظمة أعمال"
            items={[
              "POS وأنظمة تشغيل",
              "مخزون وتقارير",
              "حلول حسب طبيعة النشاط",
              "تبسيط الإجراءات اليومية",
            ]}
          />
          <Service
            icon={Search}
            title="SEO"
            items={[
              "Sitemap / Robots",
              "Metadata احترافي",
              "Structured Data",
              "تحسين الظهور والسرعة",
            ]}
          />
          <Service
            icon={Database}
            title="ربط البيانات والباك اند"
            items={[
              "قواعد بيانات منظمة",
              "واجهات API قوية",
              "حفظ وإدارة البيانات",
              "بنية قابلة للتوسع",
            ]}
          />
          <Service
            icon={Cpu}
            title="حلول مخصصة"
            items={[
              "أنظمة حسب الطلب",
              "تطوير خاص حسب الفكرة",
              "تكامل بين الويب والتطبيق",
              "مرونة في التوسعة",
            ]}
          />
          <Service
            icon={Wrench}
            title="صيانة وتطوير"
            items={[
              "تحديثات وتحسينات",
              "إضافة مزايا جديدة",
              "تحسين واجهات المستخدم",
              "متابعة بعد الإطلاق",
            ]}
          />
        </div>
      </section>

      <section className="mt-16 grid gap-4 lg:grid-cols-3">
        <HighlightCard
          title="تطبيقات هاتف بهوية قوية"
          desc="لا نبني تطبيقًا عاديًا، بل نركز على تجربة استخدام واضحة، شكل عصري، وتفاصيل تعزز قيمة المشروع."
        />
        <HighlightCard
          title="من الفكرة إلى الإطلاق"
          desc="سواء كان المشروع موقعًا، نظامًا، أو تطبيقًا، نرتب البنية والتجربة من البداية بشكل مدروس."
        />
        <HighlightCard
          title="حل رقمي متكامل"
          desc="إمكانية ربط الموقع مع لوحة الإدارة والتطبيقات ضمن تجربة واحدة متناسقة وقوية."
        />
      </section>

      <section className="mt-16 card overflow-hidden p-0">
        <div className="relative bg-gradient-to-br from-neon-500/15 via-ink-950/90 to-black p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,240,111,0.18),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(0,240,111,0.08),transparent_35%)]" />
          <div className="relative">
            <div className="flex items-center gap-2 text-neon-300/90">
              <Rocket className="h-5 w-5" />
              <span className="text-xs tracking-[0.25em]">NEXT STEP</span>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
              ما الذي تحتاجه الآن؟
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
              أرسل فكرتك سواء كانت موقع شركة، لوحة تحكم، نظام خاص، تطبيق Android،
              أو تطبيق iOS — وسنرتب لك تصورًا واضحًا لبداية قوية.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>موقع شركة</Badge>
              <Badge>تطبيق Android</Badge>
              <Badge>تطبيق iOS</Badge>
              <Badge>لوحة إدارة</Badge>
              <Badge>نظام خاص</Badge>
              <Badge>SEO</Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                تواصل الآن <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/why-us" className="btn">
                لماذا نحن <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== Enhanced InteractivePhone with Performance Optimizations ====================
function InteractivePhone() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Motion values for mouse-driven rotation (tilt)
  const mouseRotateX = useMotionValue(0);
  const mouseRotateY = useMotionValue(0);
  const mouseRotateZ = useMotionValue(0);
  const mouseTranslateZ = useMotionValue(0);

  // Glare position derived from mouse rotation
  const glareX = useTransform(mouseRotateY, [-14, 14], ["35%", "65%"]);
  const glareY = useTransform(mouseRotateX, [-14, 14], ["35%", "65%"]);

  // Floating animation values (subtle, continuous motion)
  const floatRotateX = useMotionValue(0);
  const floatRotateY = useMotionValue(0);
  const floatRotateZ = useMotionValue(0);
  const floatTranslateZ = useMotionValue(0);

  // استخدام useCallback لتجنب إعادة إنشاء الدالة في كل ريندر
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const yaw = (px - 0.5) * 22;
    const pitch = (0.5 - py) * 22;

    const dx = px - 0.5;
    const dy = py - 0.5;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const roll = (dx * dy) * 10;
    const z = (1 - dist * 2) * 15;

    mouseRotateX.set(pitch);
    mouseRotateY.set(yaw);
    mouseRotateZ.set(roll);
    mouseTranslateZ.set(z);
  }, [mouseRotateX, mouseRotateY, mouseRotateZ, mouseTranslateZ]);

  const reset = useCallback(() => {
    mouseRotateX.set(0);
    mouseRotateY.set(0);
    mouseRotateZ.set(0);
    mouseTranslateZ.set(0);
  }, [mouseRotateX, mouseRotateY, mouseRotateZ, mouseTranslateZ]);

  // تحسين useAnimationFrame: تقليل التحديثات باستخدام requestAnimationFrame خارج React
  useAnimationFrame((t) => {
    const speed = 0.002;
    floatRotateX.set(Math.sin(t * speed) * 1.5);
    floatRotateY.set(Math.cos(t * speed * 1.3) * 1.5);
    floatRotateZ.set(Math.sin(t * speed * 0.7) * 1);
    floatTranslateZ.set(Math.sin(t * speed * 1.8) * 4);
  });

  // Combine mouse and float values
  const rotateX = useTransform(() => mouseRotateX.get() + floatRotateX.get());
  const rotateY = useTransform(() => mouseRotateY.get() + floatRotateY.get());
  const rotateZ = useTransform(() => mouseRotateZ.get() + floatRotateZ.get());
  const translateZ = useTransform(() => mouseTranslateZ.get() + floatTranslateZ.get());

  // Smoothing springs
  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const smoothRotateZ = useSpring(rotateZ, { stiffness: 300, damping: 30 });
  const smoothTranslateZ = useSpring(translateZ, { stiffness: 400, damping: 40 });

  // استخدام useMemo للقيم الثابتة للـ will-change
  const willChangeStyle = useMemo(() => ({ willChange: "transform" }), []);

  return (
    <div className="perspective-[1800px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          rotateZ: smoothRotateZ,
          translateZ: smoothTranslateZ,
          transformStyle: "preserve-3d",
          ...willChangeStyle, // إضافة will-change لتحسين الأداء
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative mx-auto w-full aspect-[9/16] cursor-grab active:cursor-grabbing"
      >
        {/* Glow behind the phone */}
        <div
          className="absolute inset-0 rounded-[clamp(20px,5vw,42px)] bg-neon-500/20 blur-3xl"
          style={{ transform: "translateZ(-60px)" }}
        />

        {/* Dynamic glare overlay */}
        <motion.div
          style={{
            background: "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.2), transparent 30%)",
            ["--gx" as any]: glareX,
            ["--gy" as any]: glareY,
          }}
          className="absolute inset-0 rounded-[clamp(20px,5vw,42px)] pointer-events-none"
        />

        {/* Phone body */}
        <div
          className="absolute inset-0 rounded-[clamp(18px,4.5vw,40px)] border border-neon-500/25 bg-[#07110c]/95 shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Dynamic notch */}
          <div className="absolute left-1/2 top-[2%] h-[0.8%] w-[30%] -translate-x-1/2 rounded-full bg-white/10" />

          {/* Screen content with responsive padding */}
          <div className="absolute inset-[4%] rounded-[clamp(16px,4vw,34px)] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-[5%] pt-[8%] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,111,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,240,111,0.06),transparent_26%)]" />

            {/* Inner card */}
            <div className="relative rounded-3xl border border-neon-500/20 bg-neon-500/10 p-[6%] shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[clamp(8px,2vw,11px)] text-white/50">Hawk App UI</div>
                  <div className="mt-1 text-[clamp(10px,2.5vw,14px)] font-semibold text-white">
                    Mobile Experience
                  </div>
                </div>
                <Smartphone className="h-[clamp(16px,4vw,20px)] w-[clamp(16px,4vw,20px)] text-neon-300" />
              </div>

              <div className="mt-[6%] space-y-[4%]">
                <Bar label="Android" value="95%" />
                <Bar label="iOS" value="92%" />
                <Bar label="UI/UX" value="98%" />
              </div>
            </div>

            {/* Mini cards grid */}
            <div className="relative mt-[6%] grid grid-cols-2 gap-[4%]">
              <MiniCard icon={Palette} label="Modern UI" />
              <MiniCard icon={BellRing} label="Notifications" />
              <MiniCard icon={ShieldCheck} label="Secure" />
              <MiniCard icon={Zap} label="Fast Flow" />
            </div>

            {/* Bottom card */}
            <div className="relative mt-[6%] rounded-3xl border border-white/10 bg-white/5 p-[6%]">
              <div className="text-[clamp(8px,2vw,11px)] text-white/50">Cross Platform</div>
              <div className="mt-1 text-[clamp(10px,2.5vw,14px)] font-semibold text-white">
                Android & iPhone Apps
              </div>
              <div className="mt-2 text-[clamp(8px,2vw,12px)] leading-[1.5] text-white/60">
                تطبيقات عملية، سريعة، واضحة، ومناسبة للنشر والتوسع.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== Helper Components (محسنة قليلاً) ====================
function Service({
  icon: Icon,
  title,
  items,
}: {
  icon: any;
  title: string;
  items: string[];
}) {
  return (
    <div className="card group relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,111,0.12),transparent_35%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="card flex h-12 w-12 items-center justify-center">
            <Icon className="h-5 w-5 text-neon-300" />
          </div>
          <div className="text-base font-semibold text-white">{title}</div>
        </div>

        <ul className="mt-5 space-y-3 text-sm text-white/70">
          {items.map((x) => (
            <li key={x} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-300" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HighlightCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card p-6">
      <div className="text-base font-semibold text-white">{title}</div>
      <div className="mt-3 text-sm leading-7 text-white/70">{desc}</div>
    </div>
  );
}

function MiniCard({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-[8%]">
      <Icon className="h-[clamp(14px,3.5vw,18px)] w-[clamp(14px,3.5vw,18px)] text-neon-300" />
      <div className="mt-2 text-[clamp(8px,2vw,11px)] text-white/70">{label}</div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: string }) {
  const width = parseInt(value, 10) || 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[clamp(8px,2vw,11px)] text-white/65">
        <span>{label}</span>
        <span className="text-neon-300">{value}</span>
      </div>
      <div className="h-[6px] overflow-hidden rounded-full bg-white/10 md:h-2">
        <div
          className="h-full rounded-full bg-neon-400/80"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function QuickFeature({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="card flex h-10 w-10 items-center justify-center">
          <Icon className="h-4 w-4 text-neon-300" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-white/60">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function GlassStat({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] text-white/50 sm:text-xs">{title}</div>
          <div className="mt-1 text-xs font-semibold text-white sm:text-sm">{value}</div>
        </div>
        <div className="card flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10">
          <Icon className="h-3 w-3 text-neon-300 sm:h-4 sm:w-4" />
        </div>
      </div>
    </div>
  );
}