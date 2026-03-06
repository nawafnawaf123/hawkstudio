import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <AdminShell title="Projects">
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs text-white/60">
              <tr>
                <th className="p-3 text-right">العنوان</th>
                <th className="p-3 text-right">Slug</th>
                <th className="p-3 text-right">منشور</th>
                <th className="p-3 text-right">مميز</th>
                <th className="p-3 text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-white/10">
                  <td className="p-3 font-medium">{p.title}</td>
                  <td className="p-3 text-white/70">{p.slug}</td>
                  <td className="p-3">{p.published ? "✅" : "—"}</td>
                  <td className="p-3">{p.featured ? "⭐" : "—"}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link className="btn px-3 py-2" href={`/portfolio/${p.slug}`} target="_blank">
                        <Eye className="h-4 w-4 text-neon-300/90" />
                      </Link>
                      <Link className="btn px-3 py-2" href={`/admin/projects/${p.id}`}>
                        <Pencil className="h-4 w-4 text-neon-300/90" />
                      </Link>
                      <form action={`/api/projects/${p.id}/delete`} method="post">
                        <button className="btn px-3 py-2" aria-label="Delete">
                          <Trash2 className="h-4 w-4 text-neon-300/90" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 ? (
                <tr>
                  <td className="p-6 text-center text-white/60" colSpan={5}>
                    لا توجد مشاريع بعد.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
