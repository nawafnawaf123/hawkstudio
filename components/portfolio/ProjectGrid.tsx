"use client";

import { useMemo, useState } from "react";
import { ProjectCard, type ProjectDTO } from "./ProjectCard";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Filter, Search } from "lucide-react";

export function ProjectGrid({
  projects,
  tags,
}: {
  projects: ProjectDTO[];
  tags: string[];
}) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>("all");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return projects.filter((p) => {
      const hitQ =
        !qq ||
        p.title.toLowerCase().includes(qq) ||
        p.summary.toLowerCase().includes(qq) ||
        p.tech.join(" ").toLowerCase().includes(qq);
      const hitTag = tag === "all" || p.tech.includes(tag);
      return hitQ && hitTag;
    });
  }, [projects, q, tag]);

  return (
    <div>
      <div className="card p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neon-300/70" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث بالاسم أو التقنية..."
              className="pr-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="pill">
              <Filter className="h-3.5 w-3.5 text-neon-300/90" />
              فلتر
            </span>
            <button
              onClick={() => setTag("all")}
              className={`pill whitespace-nowrap ${tag === "all" ? "border-neon-500/30 bg-neon-500/10" : ""}`}
            >
              الكل
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`pill whitespace-nowrap ${tag === t ? "border-neon-500/30 bg-neon-500/10" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>

      <div className="mt-6 text-xs text-white/60">
        النتائج: <span className="text-neon-300">{filtered.length}</span>
      </div>
    </div>
  );
}
