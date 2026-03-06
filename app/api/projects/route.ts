import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const nullableString = z.string().optional().nullable();

const createSchema = z.object({
  title: z.string().min(2, "title is required"),
  slug: nullableString,
  summary: nullableString,
  content: nullableString,
  coverImage: nullableString,
  images: z.union([z.array(z.string()), z.string()]).optional().nullable(),
  tech: z.union([z.array(z.string()), z.string()]).optional().nullable(),
  liveUrl: nullableString,
  repoUrl: nullableString,
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

const updateSchema = z.object({
  id: z.string().min(2, "id is required"),
  title: nullableString,
  slug: nullableString,
  summary: nullableString,
  content: nullableString,
  coverImage: nullableString,
  images: z.union([z.array(z.string()), z.string()]).optional().nullable(),
  tech: z.union([z.array(z.string()), z.string()]).optional().nullable(),
  liveUrl: nullableString,
  repoUrl: nullableString,
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === "string") {
    const v = value.trim();

    if (!v) return [];

    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) {
        return parsed.map(String).filter(Boolean);
      }
    } catch {}

    return v
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  return [];
}

function safeText(value: string | null | undefined, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

async function ensureUniqueSlug(base: string, currentId?: string) {
  let slug = base || `project-${Math.random().toString(36).slice(2, 10)}`;
  let i = 1;

  while (true) {
    const exists = await prisma.project.findUnique({ where: { slug } });

    if (!exists) return slug;
    if (currentId && exists.id === currentId) return slug;

    slug = `${base || "project"}-${i++}`;
  }
}

function normalizeProject(project: any) {
  return {
    ...project,
    images: toArray(project.images),
    tech: toArray(project.tech),
  };
}

export async function GET() {
  const rows = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(rows.map(normalizeProject));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createSchema.parse(body);

    const title = safeText(parsed.title);
    const summary = safeText(parsed.summary);
    const content = safeText(parsed.content, summary || title);
    const baseSlug = slugify(safeText(parsed.slug) || title);
    const slug = await ensureUniqueSlug(baseSlug);

    const images = toArray(parsed.images);
    const tech = toArray(parsed.tech);

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        summary,
        content,
        coverImage: safeText(parsed.coverImage),
        images: JSON.stringify(images),
        tech: JSON.stringify(tech),
        liveUrl: safeText(parsed.liveUrl),
        repoUrl: safeText(parsed.repoUrl),
        featured: parsed.featured ?? false,
        published: parsed.published ?? true,
      },
    });

    return NextResponse.json(normalizeProject(project));
  } catch (error: any) {
    console.error("POST /api/projects error:", error);

    return NextResponse.json(
      {
        error: "Create failed",
        details: error?.issues || error?.message || error,
      },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);

    const existing = await prisma.project.findUnique({
      where: { id: parsed.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const title =
      parsed.title !== undefined && parsed.title !== null
        ? safeText(parsed.title)
        : existing.title;

    const summary =
      parsed.summary !== undefined && parsed.summary !== null
        ? safeText(parsed.summary)
        : existing.summary;

    const content =
      parsed.content !== undefined && parsed.content !== null
        ? safeText(parsed.content, summary || title)
        : existing.content;

    const slugInput =
      parsed.slug !== undefined && parsed.slug !== null
        ? safeText(parsed.slug)
        : existing.slug;

    const slug = await ensureUniqueSlug(
      slugify(slugInput || title || existing.title),
      existing.id
    );

    const images =
      parsed.images !== undefined ? toArray(parsed.images) : toArray(existing.images);

    const tech =
      parsed.tech !== undefined ? toArray(parsed.tech) : toArray(existing.tech);

    const updated = await prisma.project.update({
      where: { id: parsed.id },
      data: {
        title,
        slug,
        summary,
        content,
        coverImage:
          parsed.coverImage !== undefined
            ? safeText(parsed.coverImage)
            : existing.coverImage,
        images: JSON.stringify(images),
        tech: JSON.stringify(tech),
        liveUrl:
          parsed.liveUrl !== undefined ? safeText(parsed.liveUrl) : existing.liveUrl,
        repoUrl:
          parsed.repoUrl !== undefined ? safeText(parsed.repoUrl) : existing.repoUrl,
        featured:
          parsed.featured !== undefined ? parsed.featured : existing.featured,
        published:
          parsed.published !== undefined ? parsed.published : existing.published,
      },
    });

    return NextResponse.json(normalizeProject(updated));
  } catch (error: any) {
    console.error("PUT /api/projects error:", error);

    return NextResponse.json(
      {
        error: "Update failed",
        details: error?.issues || error?.message || error,
      },
      { status: 400 }
    );
  }
}

export async function PATCH(req: Request) {
  return PUT(req);
}