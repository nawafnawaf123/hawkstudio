"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectArtwork } from "@/components/projects/ProjectArtwork";
import type { Lang } from "@/components/locale/LanguageProvider";
import type { StudioProject } from "@/lib/projects";

const VideoShowcase = dynamic(
  () => import("@/components/media/VideoShowcase").then((module) => module.VideoShowcase),
  { ssr: false },
);

type ProjectCardProps = {
  project: StudioProject;
  lang: Lang;
  position: "active" | "previous" | "next" | "hidden";
  onOpen: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function ProjectCard({ project, lang, position, onOpen }: ProjectCardProps) {
  const content = project.copy[lang];
  const media = project.media;

  return (
    <article className="project-card" data-position={position} aria-hidden={position !== "active"}>
      <Link
        href={`/projects/${project.slug}`}
        prefetch={false}
        className="project-card-link"
        tabIndex={position === "active" ? 0 : -1}
        data-cursor="view"
        onClick={onOpen}
        aria-label={`${content.title} — ${content.category}`}
      >
        <div className="project-card-media">
          {media?.type === "image" ? (
            <Image src={media.src} alt={media.alt[lang]} fill sizes="(max-width: 720px) 78vw, 36vw" />
          ) : media?.type === "video" ? (
            <VideoShowcase
              poster={media.poster}
              mp4={media.mp4}
              webm={media.webm}
              label={media.alt[lang]}
            />
          ) : (
            <ProjectArtwork visual={project.visual} priority={project.number === "01"} />
          )}
        </div>
        <div className="project-card-meta">
          <div><span>{project.number} / {project.year}</span><small>{content.category}</small></div>
          <ArrowUpRight />
        </div>
        <div className="project-card-copy">
          <h3>{content.title}</h3>
          <p>{content.summary}</p>
        </div>
      </Link>
    </article>
  );
}
