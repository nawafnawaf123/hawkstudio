import { requireAdmin } from "@/lib/require-admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <AdminShell title="New Project">
      <ProjectEditor
        initial={{
          title: "",
          slug: "",
          summary: "",
          content: "",
          coverImage: null,
          images: [],
          tech: [],
          liveUrl: null,
          repoUrl: null,
          featured: false,
          published: true,
        }}
      />
    </AdminShell>
  );
}
