import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Github, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectDTO = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: string | null;
  tech: string[];
  featured: boolean;
  liveUrl?: string | null;
  repoUrl?: string | null;
};

export function ProjectCard({ p }: { p: ProjectDTO }) {
  return (
    <div className={cn("card group overflow-hidden p-0")}>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-black/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.coverImage || "/uploads/demo-1.png"}
          alt={p.title}
          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {p.featured ? (
          <div className="absolute right-4 top-4">
            <Badge className="border-neon-500/25 bg-neon-500/10">
              <Sparkle className="h-3.5 w-3.5 text-neon-300" />
              مميز
            </Badge>
          </div>
        ) : null}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold">{p.title}</div>
            <div className="mt-2 line-clamp-2 text-sm text-white/70">
              {p.summary}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {p.liveUrl ? (
              <a className="btn px-3 py-2" href={p.liveUrl} target="_blank" aria-label="Live">
                <ExternalLink className="h-4 w-4 text-neon-300/90" />
              </a>
            ) : null}
            {p.repoUrl ? (
              <a className="btn px-3 py-2" href={p.repoUrl} target="_blank" aria-label="Repo">
                <Github className="h-4 w-4 text-neon-300/90" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-5">
          <Link href={`/portfolio/${p.slug}`} className="btn btn-primary w-full">
            تفاصيل المشروع
          </Link>
        </div>
      </div>
    </div>
  );
}
