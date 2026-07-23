/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { LanguageProvider } from "@/components/locale/LanguageProvider";
import { PageMotion } from "@/components/animations/PageMotion";
import { site } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#f2f0e9",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Hawk Studio | تصميم وبرمجة مواقع وتطبيقات", template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  icons: {
    icon: [{ url: "/brand/logo_dark.png", type: "image/png" }],
    shortcut: "/brand/logo_dark.png",
    apple: "/brand/logo_dark.png",
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Hawk Studio | تصميم وبرمجة مواقع وتطبيقات",
    description: site.description,
    siteName: site.name,
    locale: "ar_LB",
    images: [{ url: "/brand/logo_dark.png", alt: "Hawk Studio لتصميم وبرمجة المواقع والتطبيقات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawk Studio | تصميم وبرمجة مواقع وتطبيقات",
    description: site.description,
    images: ["/brand/logo_dark.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/logo_dark.png`,
        image: `${site.url}/brand/website_light.png`,
        description: site.description,
        email: site.email,
        telephone: site.phoneHref,
        areaServed: ["Lebanon", "Worldwide"],
        knowsAbout: [
          "تصميم المواقع",
          "برمجة المواقع",
          "تطوير الويب",
          "تصميم تجربة المستخدم",
          "تطبيقات Android",
          "تطبيقات iOS",
          "Web Development",
          "Mobile App Development",
          "UI/UX Design",
        ],
        makesOffer: [
          "تصميم وبرمجة المواقع",
          "تصميم وتطوير تطبيقات Android وiOS",
          "تصميم واجهات وتجربة المستخدم",
          "الهوية الرقمية والحركة التفاعلية",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: ["ar", "en"],
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem("hawk-theme")==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}` }} />
      </head>
      <body>
        <LanguageProvider>
          <PageMotion />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
