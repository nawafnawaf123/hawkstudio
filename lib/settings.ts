import { prisma } from "@/lib/db";

export type PublicSettings = {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  maintenanceMode: boolean;
  socialInstagram?: string;
  socialX?: string;
  socialLinkedIn?: string;
  socialGithub?: string;
};

function safeText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const v = value.trim();
  return v.length ? v : fallback;
}

function safeUrl(value: unknown, fallback: string) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    const url = new URL(value.trim());
    return url.toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

function safeEmail(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const v = value.trim();
  if (!v.includes("@")) return fallback;
  return v;
}

export function normalizeSettings(row?: any | null): PublicSettings {
  const defaultUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return {
    siteName: safeText(row?.siteName, "Hawk Studio"),
    siteDescription: safeText(
      row?.siteDescription,
      "حلول برمجية احترافية، مواقع وتطبيقات، وتجارب رقمية بهوية سينمائية."
    ),
    siteUrl: safeUrl(row?.siteUrl, defaultUrl),
    contactPhone: safeText(row?.contactPhone, process.env.CONTACT_PHONE || "+96170000000"),
    contactWhatsApp: safeText(
      row?.contactWhatsApp,
      process.env.CONTACT_WHATSAPP || "+96170000000"
    ),
    contactEmail: safeEmail(
      row?.contactEmail,
      process.env.CONTACT_EMAIL || "hello@hawk.studio"
    ),
    maintenanceMode: Boolean(row?.maintenanceMode),
    socialGithub: typeof row?.socialGithub === "string" ? row.socialGithub : "",
    socialInstagram: typeof row?.socialInstagram === "string" ? row.socialInstagram : "",
    socialLinkedIn: typeof row?.socialLinkedIn === "string" ? row.socialLinkedIn : "",
    socialX: typeof row?.socialX === "string" ? row.socialX : "",
  };
}

export async function getPublicSettings(): Promise<PublicSettings> {
  try {
    const row = await prisma.setting.findFirst();
    return normalizeSettings(row);
  } catch {
    return normalizeSettings(null);
  }
}