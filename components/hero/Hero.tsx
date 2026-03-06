"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Code2, Sparkles, ShieldCheck, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-x pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-neon-500/20 bg-neon-500/10 px-3 py-1 text-xs text-white/80 shadow-glow"
            >
              <Sparkles className="h-4 w-4 text-neon-300" />
              <span>Hawk Studio — عالم برمجي بمظهر سينمائي</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.08}
              className="mt-5 text-4xl font-semibold leading-tight md:text-5xl"
            >
              نُحوّل أفكارك إلى
              <span className="text-neon-300"> تجربة رقمية </span>
              تسرق الانتباه.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.16}
              className="mt-4 text-sm leading-7 text-white/70"
            >
              مواقع وتطبيقات ولوحات تحكم — مصممة لتكون سريعة، قابلة للتوسع، ومهيأة
              لمحركات البحث… مع بصمة Hawk الخضراء.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.24}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link className="btn btn-primary" href="/portfolio">
                شاهد أعمالنا
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link className="btn" href="/contact">
                ابدأ مشروعك
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.32}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              <Feature icon={Zap} title="أداء" desc="تحميل خاطف وتجربة سلسة" />
              <Feature icon={ShieldCheck} title="ثقة" desc="معايير أمان أساسية" />
              <Feature icon={Code2} title="جودة" desc="كود نظيف + قابل للتوسع" />
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-neon-500/10 blur-2xl" />
            <div className="card relative overflow-hidden p-6 md:p-7">
              <div className="relative">
                <div className="absolute -left-1/2 top-6 h-px w-[200%] glowline opacity-70" />
                <div className="absolute -left-1/2 top-20 h-px w-[200%] glowline opacity-40" />
                <div className="absolute -left-1/2 top-32 h-px w-[200%] glowline opacity-30" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Hawk Studio</div>
                <div className="pill">
                  <span className="inline-block h-2 w-2 rounded-full bg-neon-400" />
                  Live
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Line label="UI/UX" value={92} />
                <Line label="Performance" value={95} />
                <Line label="SEO" value={90} />
                <Line label="Scalability" value={88} />
              </div>

              <div className="mt-7 card p-4">
                <div className="text-xs font-semibold text-white/80">
                  Ready for launch
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Admin CMS • Portfolio • Maintenance mode • SEO toolkit
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-white/55">
                <span>Build: Next.js + Prisma</span>
                <span className="animate-floaty">●</span>
              </div>

              <div className="pointer-events-none absolute inset-0 grid-overlay opacity-25" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-noise" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2">
        <div className="card flex h-9 w-9 items-center justify-center">
          <Icon className="h-4 w-4 text-neon-300" />
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="mt-2 text-xs text-white/65">{desc}</div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-white/70">
        <span>{label}</span>
        <span className="text-neon-300">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-black/30">
        <div
          className="h-full rounded-full bg-neon-500/35"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
