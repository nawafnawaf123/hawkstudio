export type PortfolioProject = {
  slug: "hawk-browser" | "hawk-gym";
  title: string;
  eyebrow: string;
  year: string;
  platform: string;
  size: string;
  accent: string;
  cover: string;
  screenshots: string[];
  downloadUrl: string;
  ar: {
    description: string;
    features: string[];
    download: string;
  };
  en: {
    description: string;
    features: string[];
    download: string;
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "hawk-browser",
    title: "HAWK Browser",
    eyebrow: "PRIVATE BROWSER / ANDROID",
    year: "2026",
    platform: "Android APK",
    size: "216 MB",
    accent: "#b8ff45",
    cover: "/work/hawk-browser/screen-01.jpg",
    screenshots: Array.from({ length: 6 }, (_, index) => `/work/hawk-browser/screen-${String(index + 1).padStart(2, "0")}.jpg`),
    downloadUrl: process.env.NEXT_PUBLIC_HAWK_BROWSER_APK_URL || "/downloads/hawk-browser.apk",
    ar: {
      description: "متصفح خاص بهوية HAWK، صُمم ليجمع الخصوصية والسرعة وأدوات التصفح الذكية داخل تجربة عربية واضحة وجريئة.",
      features: ["تصفح خاص وحماية مدمجة", "مركز تحكم وأدوات ذكية", "Hawk Eye وتحليل الصفحات", "تصميم داكن سريع ومتجاوب"],
      download: "تحميل نسخة التجربة",
    },
    en: {
      description: "A private browser built in the HAWK identity, combining privacy, speed, and intelligent browsing tools in a clear, bold experience.",
      features: ["Private browsing and built-in protection", "Control centre and smart tools", "Hawk Eye page intelligence", "Fast responsive dark interface"],
      download: "Download test build",
    },
  },
  {
    slug: "hawk-gym",
    title: "HAWK Gym",
    eyebrow: "FITNESS SYSTEM / ANDROID",
    year: "2026",
    platform: "Android APK",
    size: "142 MB",
    accent: "#c7ff28",
    cover: "/work/hawk-gym/screen-04.jpg",
    screenshots: Array.from({ length: 15 }, (_, index) => `/work/hawk-gym/screen-${String(index + 1).padStart(2, "0")}.jpg`),
    downloadUrl: process.env.NEXT_PUBLIC_HAWK_GYM_APK_URL || "/downloads/hawk-gym.apk",
    ar: {
      description: "تطبيق لياقة وتغذية ذكي ينظم الخطة التدريبية، السعرات، الوجبات والتذكيرات في واجهة موحدة تدعم الوضعين الفاتح والداكن.",
      features: ["خطط تدريب مخصصة", "متابعة السعرات والعناصر الغذائية", "مسح الوجبات بالكاميرا", "مواعيد وتنبيهات يومية"],
      download: "تحميل نسخة التجربة",
    },
    en: {
      description: "A smart fitness and nutrition app that brings training plans, calories, meals, and reminders into one coherent light and dark interface.",
      features: ["Personalised training plans", "Calories and nutrition tracking", "Camera-based meal scanning", "Daily schedules and reminders"],
      download: "Download test build",
    },
  },
];
