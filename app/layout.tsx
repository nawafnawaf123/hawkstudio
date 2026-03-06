// layout.tsx - تحسين الأداء وإضافة smooth scrolling
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { Toaster } from "@/components/ui/Toaster";
import { getPublicSettings } from "@/lib/settings";

export const viewport: Viewport = {
  themeColor: "#070b0b",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const s = await getPublicSettings();

  const title = s.siteName || "Hawk Studio";
  const description =
    s.siteDescription ||
    "Hawk Studio — حلول برمجية احترافية، مواقع وتطبيقات، وتجارب رقمية بهوية سينمائية.";

  const url = s.siteUrl || "http://localhost:3000";

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s — ${title}`,
    },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: title,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    icons: {
      icon: "/icon.png",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const s = await getPublicSettings();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.siteName || "Hawk Studio",
    url: s.siteUrl || "http://localhost:3000",
    email: s.contactEmail || undefined,
    telephone: s.contactPhone || undefined,
    sameAs: [
      s.socialInstagram || undefined,
      s.socialX || undefined,
      s.socialLinkedIn || undefined,
      s.socialGithub || undefined,
    ].filter(Boolean),
  };

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: s.siteName || "Hawk Studio",
    url: s.siteUrl || "http://localhost:3000",
    potentialAction: {
      "@type": "SearchAction",
      target: `${s.siteUrl || "http://localhost:3000"}/portfolio?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* تحسين أداء التمرير */}
        <style>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </head>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />

        <div className="pointer-events-none fixed inset-0 grid-overlay opacity-40" />
        <div className="pointer-events-none fixed inset-0 bg-noise opacity-[0.06]" />

        <Navbar settings={s} />
        <main className="relative">{children}</main>
        <Footer settings={s} />
        <Toaster />
      </body>
    </html>
  );
}