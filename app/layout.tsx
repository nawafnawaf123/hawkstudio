import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Alexandria, Manrope } from "next/font/google";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { LanguageProvider } from "@/components/locale/LanguageProvider";
import { PageMotion } from "@/components/animations/PageMotion";
import { site } from "@/lib/site";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-alexandria",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-manrope",
});

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
    icon: [{
      url: "/_next/image?url=%2Fbrand%2Flogo_dark.png&w=64&q=82",
      type: "image/webp",
      sizes: "64x64",
    }],
    shortcut: "/_next/image?url=%2Fbrand%2Flogo_dark.png&w=64&q=82",
    apple: "/_next/image?url=%2Fbrand%2Flogo_dark.png&w=192&q=84",
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
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
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
