import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  desc,
  className,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      {eyebrow ? (
        <div className="mb-2 text-xs font-semibold tracking-widest text-neon-300/90">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-2 text-sm text-white/70">{desc}</p> : null}
    </div>
  );
}
