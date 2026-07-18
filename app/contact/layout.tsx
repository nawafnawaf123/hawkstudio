import type { Metadata } from "next";
import { site } from "@/lib/site";

const title = "تواصل لبدء مشروع موقع أو تطبيق";
const description = "تواصل مع Hawk Studio لبدء تصميم وبرمجة موقع، منصة رقمية أو تطبيق Android وiOS عبر الهاتف أو واتساب أو البريد الإلكتروني.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: new URL("/contact", site.url) },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
