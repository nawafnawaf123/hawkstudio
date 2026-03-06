import { prisma } from "@/lib/db";

function mapProject(p: any) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    content: p.content,
    coverImage: p.coverImage,
    images: JSON.parse(p.images || "[]") as string[],
    tech: JSON.parse(p.tech || "[]") as string[],
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
    featured: p.featured,
    published: p.published,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export async function getPublishedProjects() {
  const rows = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
  });
  return rows.map(mapProject);
}

export async function getFeaturedProjects() {
  const rows = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    take: 6,
  });
  return rows.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    coverImage: p.coverImage,
    tech: JSON.parse(p.tech || "[]") as string[],
    featured: p.featured,
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
  }));
}

export async function getProjectBySlug(slug: string) {
  const p = await prisma.project.findUnique({ where: { slug } });
  return p ? mapProject(p) : null;
}

export async function getPublishedSlugs() {
  const rows = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((x) => x.slug);
}
