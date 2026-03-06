import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getProjectBySlug, getPublishedSlugs } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // ✅ مهم: فك ترميز الـ slug القادم من الرابط
  const slug = decodeURIComponent(params.slug);

  const p = await getProjectBySlug(slug);
  if (!p || !p.published) return notFound();

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/portfolio" className="btn">
          <ArrowLeft className="h-4 w-4" />
          رجوع
        </Link>

        <div className="flex items-center gap-2">
          {p.liveUrl ? (
            <a className="btn btn-primary" href={p.liveUrl} target="_blank" rel="noreferrer">
              Live <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
          {p.repoUrl ? (
            <a className="btn" href={p.repoUrl} target="_blank" rel="noreferrer">
              Repo <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="card overflow-hidden p-0">
            <div className="relative aspect-[16/9] bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.coverImage || "/uploads/demo-1.png"}
                alt={p.title}
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-semibold md:text-3xl">{p.title}</h1>
              <p className="mt-3 text-sm leading-7 text-white/70">{p.content}</p>

              {p.images.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {p.images.map((src) => (
                    <div key={src} className="card overflow-hidden p-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={p.title} className="h-48 w-full object-cover opacity-90" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-neon-300/90" />
              <div className="text-sm font-semibold">تفاصيل</div>
            </div>

            <div className="mt-4 text-sm text-white/75">
              <div className="text-xs text-white/55">ملخص</div>
              <div className="mt-1">{p.summary}</div>
            </div>

            <div className="mt-5">
              <div className="text-xs text-white/55">التقنيات</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 card p-4">
              <div className="text-xs font-semibold text-white/80">تريد نفس المستوى؟</div>
              <div className="mt-1 text-xs text-white/60">ارسل التفاصيل وسنقترح بنية واضحة + تقدير وقت/تكلفة.</div>
              <Link href="/contact" className="btn btn-primary mt-3 w-full">
                تواصل الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}