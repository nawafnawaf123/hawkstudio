"use client";

import Link from "next/link";
import { useRef, type AnchorHTMLAttributes, type CSSProperties, type PointerEvent } from "react";

type MagneticLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export function MagneticLink({
  href,
  className = "",
  children,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frameRef = useRef(0);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse" || !ref.current) return;

    const element = ref.current;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (event.clientX - left - width / 2) * 0.16;
    const y = (event.clientY - top - height / 2) * 0.16;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
      element.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
    });
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(event);
    if (!ref.current) return;
    ref.current.style.setProperty("--magnetic-x", "0px");
    ref.current.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`magnetic-link ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        "--magnetic-x": "0px",
        "--magnetic-y": "0px",
        ...style,
      } as CSSProperties}
      {...props}
    >
      {children}
    </Link>
  );
}
