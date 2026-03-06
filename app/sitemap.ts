import { getPublicSettings } from "@/lib/settings";
import { prisma } from "@/lib/db";

export default async function sitemap() {
  const s = await getPublicSettings();
  const site = s.siteUrl || "http://localhost:3000";

  const now = new Date().toISOString();

  const staticRoutes = ["", "/portfolio", "/services", "/about", "/contact"].map((p) => ({
    url: `${site}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const projectRoutes = projects.map((p) => ({
    url: `${site}/portfolio/${p.slug}`,
    lastModified: p.updatedAt.toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
