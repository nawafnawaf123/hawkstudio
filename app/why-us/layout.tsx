import type { Metadata } from "next";
import { site } from "@/lib/site";

const title = "لماذا Hawk لتصميم وتطوير مشروعك الرقمي";
const description = "تصميم جريء، برمجة دقيقة، أداء سريع وتجربة مستخدم مدروسة للمواقع وتطبيقات Android وiOS القابلة للنمو.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/why-us" },
  openGraph: { title, description, url: new URL("/why-us", site.url) },
};

export default function WhyUsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
