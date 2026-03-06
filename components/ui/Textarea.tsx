import { cn } from "@/lib/utils";

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-neon-500/40 focus:ring-2 focus:ring-neon-500/10",
        className
      )}
      {...rest}
    />
  );
}
