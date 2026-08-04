import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأعمال | تطبيقات HAWK Browser وHAWK Gym",
  description: "استعرض أعمال Hawk Studio، شاشات تطبيق HAWK Browser وHAWK Gym، وحمّل نسخ Android التجريبية بصيغة APK.",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
