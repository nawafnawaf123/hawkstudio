import type { Metadata } from "next";
import { site } from "@/lib/site";

const title = "عن استوديو التصميم والبرمجة";
const description = "تعرّف على Hawk Studio، استوديو يجمع الاستراتيجية وتصميم الواجهات وبرمجة المواقع والتطبيقات لصناعة تجارب رقمية سريعة وواضحة.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: new URL("/about", site.url) },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
