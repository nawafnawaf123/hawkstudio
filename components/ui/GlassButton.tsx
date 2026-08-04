"use client";

import { useCallback, type ComponentProps, type CSSProperties, type PointerEvent } from "react";
import { MagneticLink } from "@/components/animations/MagneticLink";

type GlassButtonProps = ComponentProps<typeof MagneticLink> & {
  tone?: "lime" | "ink";
};

export function GlassButton({
  className = "",
  tone = "ink",
  onPointerMove,
  onPointerLeave,
  children,
  style,
  ...props
}: GlassButtonProps) {
  const handlePointerMove = useCallback((event: PointerEvent<HTMLAnchorElement>) => {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse") return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--glass-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--glass-y", `${event.clientY - rect.top}px`);
  }, [onPointerMove]);

  const handlePointerLeave = useCallback((event: PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(event);
    event.currentTarget.style.setProperty("--glass-x", "50%");
    event.currentTarget.style.setProperty("--glass-y", "50%");
  }, [onPointerLeave]);

  return (
    <MagneticLink
      {...props}
      className={`glass-button glass-button-${tone} ${className}`}
      data-cursor="action"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        "--glass-x": "50%",
        "--glass-y": "50%",
        ...style,
      } as CSSProperties}
    >
      <span className="glass-button-label">{children}</span>
      <i className="glass-button-shine" aria-hidden="true" />
    </MagneticLink>
  );
}
