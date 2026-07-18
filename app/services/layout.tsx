import type { Metadata } from "next";
import { site } from "@/lib/site";

const title = "تصميم وبرمجة المواقع وتطبيقات Android وiOS";
const description = "خدمات تصميم وبرمجة مواقع سريعة ومتجاوبة، وتطوير تطبيقات Android وiOS، وتصميم UI/UX وهوية رقمية متكاملة من Hawk Studio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: new URL("/services", site.url) },
};

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
