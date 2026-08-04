import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";
import { getNextProject, getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const ar = project.copy.ar;
  const en = project.copy.en;

  return {
    title: `${ar.title} | ${en.title}`,
    description: `${ar.summary} ${en.summary}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/projects/${project.slug}`,
      title: `${ar.title} | ${en.title}`,
      description: ar.summary,
      images: [{ url: "/og.png", alt: ar.title }],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <ProjectDetailContent project={project} nextProject={getNextProject(project.slug)} />;
}
