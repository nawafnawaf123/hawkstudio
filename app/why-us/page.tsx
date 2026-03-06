import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  ShieldCheck,
  Rocket,
  Layers3,
  BadgeCheck,
  TimerReset,
  Search,
} from "lucide-react";

export default function WhyUsPage() {
  return (
    <div className="container-x py-10">
      <SectionTitle
        eyebrow="WHY US"
        title="لماذا Hawk Studio؟"
        desc="لأننا لا نبني مجرد موقع، بل نبني حضورًا رقميًا قويًا وسريعًا وقابلًا للتوسع."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          icon={Rocket}
          title="سرعة تنفيذ"
          desc="بنية جاهزة واحترافية تقلل الوقت وتسرع الانطلاق."
        />
        <Card
          icon={ShieldCheck}
          title="ثبات وأمان"
          desc="معالجة للمشاكل الأساسية ومنع الإعدادات من تخريب الموقع."
        />
        <Card
          icon={Search}
          title="SEO قوي"
          desc="تهيئة للمحركات من البداية: Metadata و Sitemap و Robots."
        />
        <Card
          icon={Layers3}
          title="لوحة إدارة سهلة"
          desc="إضافة وتعديل الأعمال وتفعيل الصيانة بسهولة ومن مكان واحد."
        />
        <Card
          icon={TimerReset}
          title="قابلية التطوير"
          desc="الموقع مبني بحيث يتوسع لاحقًا بدون إعادة بناء من الصفر."
        />
        <Card
          icon={BadgeCheck}
          title="هوية احترافية"
          desc="تصميم متناسق مع هوية Hawk Studio الخضراء والسوداء."
        />
      </div>

      <div className="mt-10 card p-6">
        <h3 className="text-lg font-semibold text-white">ماذا تستفيد معنا؟</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            موقع سريع، أنيق، ويعطي انطباع احترافي من أول زيارة.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            لوحة إدارة واضحة تسمح لك بنشر أعمالك وتحديثها بسهولة.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            توافق ممتاز مع التوسع لاحقًا وإضافة صفحات أو خدمات جديدة.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            شكل بصري متناسق مع هوية العلامة ويعطي طابعًا أقوى للثقة.
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
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
        <div className="text-base font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-sm text-white/70">{desc}</div>
    </div>
  );
}