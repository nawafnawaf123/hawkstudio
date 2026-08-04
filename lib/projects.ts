import type { Lang } from "@/components/locale/LanguageProvider";

export type ProjectVisual = "identity" | "commerce" | "mobile";

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt: Record<Lang, string>;
    }
  | {
      type: "video";
      poster: string;
      mp4?: string;
      webm?: string;
      alt: Record<Lang, string>;
    };

type ProjectCopy = {
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  capabilities: string[];
};

export type StudioProject = {
  slug: string;
  number: string;
  year: string;
  visual: ProjectVisual;
  media?: ProjectMedia;
  copy: Record<Lang, ProjectCopy>;
};

export const projects: StudioProject[] = [
  {
    slug: "hawk-digital-identity",
    number: "01",
    year: "2026",
    visual: "identity",
    copy: {
      ar: {
        title: "هوية HAWK الرقمية",
        category: "هوية وتجربة رقمية",
        summary: "نظام رقمي جريء يربط هوية الاستوديو بالحركة والوضوح والأداء.",
        challenge: "تحويل شخصية HAWK الحادة إلى حضور رقمي واضح يعمل بالقدر نفسه على الشاشات الكبيرة والهاتف.",
        solution: "بنينا لغة بصرية تعتمد على التباين، الإيقاع التحريري، والحركة الخفيفة التي تقود الانتباه دون أن تبطئ التجربة.",
        result: "تجربة متماسكة تعرّف عن الاستوديو بقوة وتبقى سهلة التصفح وسريعة الاستجابة.",
        capabilities: ["استراتيجية رقمية", "UI/UX", "تطوير ويب", "Motion"],
      },
      en: {
        title: "HAWK Digital Identity",
        category: "Identity & digital experience",
        summary: "A bold digital system connecting the studio identity with motion, clarity, and performance.",
        challenge: "Translate HAWK’s sharp personality into a digital presence that feels equally strong on wide screens and mobile.",
        solution: "We shaped a visual language around contrast, editorial rhythm, and purposeful motion that guides attention without slowing the experience.",
        result: "A coherent experience that introduces the studio with confidence while staying fast and easy to navigate.",
        capabilities: ["Digital strategy", "UI/UX", "Web development", "Motion"],
      },
    },
  },
  {
    slug: "commerce-control-system",
    number: "02",
    year: "2026",
    visual: "commerce",
    copy: {
      ar: {
        title: "نظام تجارة ذكي",
        category: "منصة ويب وتجربة تشغيل",
        summary: "تصور لنظام تجارة يختصر البيانات المعقدة إلى قرارات واضحة وسريعة.",
        challenge: "عرض المخزون والطلبات والأداء في مساحة واحدة دون إغراق المستخدم بالأرقام أو القوائم.",
        solution: "صممنا بنية وحدات مرنة، وتسلسلًا بصريًا واضحًا، وحالات تفاعل تمنح كل قرار سياقه الصحيح.",
        result: "منصة قابلة للتوسع تبدو بسيطة عند الاستخدام رغم عمق الوظائف خلفها.",
        capabilities: ["Product design", "Design system", "Dashboard UX", "Frontend"],
      },
      en: {
        title: "Commerce Control System",
        category: "Web platform & operations",
        summary: "A commerce system concept that turns complex data into clear, fast decisions.",
        challenge: "Bring inventory, orders, and performance into one space without overwhelming people with numbers and menus.",
        solution: "We designed a flexible modular structure, clear hierarchy, and interaction states that give every decision the right context.",
        result: "A scalable platform that feels simple to use despite the depth of its capabilities.",
        capabilities: ["Product design", "Design system", "Dashboard UX", "Frontend"],
      },
    },
  },
  {
    slug: "mobile-service-platform",
    number: "03",
    year: "2026",
    visual: "mobile",
    copy: {
      ar: {
        title: "منصة خدمات للجوال",
        category: "Android وiOS",
        summary: "تجربة جوال موحّدة تجعل الوصول إلى الخدمة أسرع وأكثر إنسانية.",
        challenge: "بناء رحلة قصيرة وواضحة تعمل بيد واحدة وتحافظ على شخصية العلامة في Android وiOS.",
        solution: "ركزنا على مسارات قليلة الخطوات، ومكوّنات مرنة، وتغذية راجعة فورية في كل نقطة تفاعل.",
        result: "منتج جوال متماسك وسهل التوسع من الشاشة الأولى حتى الخدمة المكتملة.",
        capabilities: ["Mobile UX", "Android", "iOS", "Prototype"],
      },
      en: {
        title: "Mobile Service Platform",
        category: "Android & iOS",
        summary: "A unified mobile experience that makes reaching a service faster and more human.",
        challenge: "Build a short, clear journey that works one-handed and preserves the brand on both Android and iOS.",
        solution: "We focused on low-step flows, flexible components, and immediate feedback at every interaction point.",
        result: "A coherent mobile product designed to scale from the first screen to a completed service.",
        capabilities: ["Mobile UX", "Android", "iOS", "Prototype"],
      },
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
