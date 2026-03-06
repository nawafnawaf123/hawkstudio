import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPublishedProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";

export const dynamic = "force-dynamic";

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const projects = await getPublishedProjects();
  const tags = Array.from(
    new Set(projects.flatMap((p) => p.tech).filter(Boolean))
  ).slice(0, 18);

  return (
    <div className="container-x py-10">
      <SectionTitle
        eyebrow="PORTFOLIO"
        title="الأعمال"
        desc="فلتر/بحث سريع — واستعراض احترافي لكل مشروع."
      />

      <ProjectGrid projects={projects} tags={tags} />
    </div>
  );
}
