import { requireAdmin } from "@/lib/require-admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const p = await prisma.project.findUnique({ where: { id: params.id } });
  if (!p) return notFound();

  const images: string[] = JSON.parse(p.images || "[]");
  const tech: string[] = JSON.parse(p.tech || "[]");

  return (
    <AdminShell title="Edit Project">
      <ProjectEditor
        initial={{
          id: p.id,
          title: p.title,
          slug: p.slug,
          summary: p.summary,
          content: p.content,
          coverImage: p.coverImage,
          images,
          tech,
          liveUrl: p.liveUrl,
          repoUrl: p.repoUrl,
          featured: p.featured,
          published: p.published,
        }}
      />
    </AdminShell>
  );
}
