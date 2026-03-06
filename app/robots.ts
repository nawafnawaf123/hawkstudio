import { getPublicSettings } from "@/lib/settings";

export default async function robots() {
  const s = await getPublicSettings();
  const site = s.siteUrl || "http://localhost:3000";

  if (s.maintenanceMode) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${site}/sitemap.xml`,
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site}/sitemap.xml`,
  };
}
