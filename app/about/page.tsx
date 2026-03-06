import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Target, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container-x py-10">
      <SectionTitle
        eyebrow="ABOUT"
        title="من نحن"
        desc="Hawk Studio: فريق يركز على الجودة، السرعة، وإبهار المستخدم من أول ثانية."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card icon={Target} title="هدفنا" desc="تجربة رقمية قوية تحوّل الزائر إلى عميل." />
        <Card icon={Users} title="أسلوبنا" desc="وضوح، بنية نظيفة، وواجهة أنيقة." />
        <Card icon={ShieldCheck} title="معاييرنا" desc="أداء + SEO + قابلية توسع." />
      </div>

      <div className="mt-10 card p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-neon-300" />
          <div className="text-sm font-semibold">قيم Hawk</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>جودة</Badge>
          <Badge>أداء</Badge>
          <Badge>وضوح</Badge>
          <Badge>تسليم سريع</Badge>
          <Badge>تجربة مستخدم</Badge>
        </div>
        <p className="mt-4 text-sm leading-7 text-white/70">
          نحن نبني مشاريع قابلة للنشر الفوري: SEO جاهز، لوحات إدارة، وبنية تسمح لك بالتوسع بدون إعادة بناء من الصفر.
        </p>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
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
