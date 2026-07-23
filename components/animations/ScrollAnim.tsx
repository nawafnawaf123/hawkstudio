"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "zoom" | "flip";

export function ScrollAnim({
  children,
  direction = "up",
  delay = 0,
  duration = 0.78,
  className = "",
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      element.classList.add("reveal-ready");
      if (entry.isIntersecting) {
        element.classList.add("reveal-visible");
        if (once) observer.disconnect();
      } else if (!once) {
        element.classList.remove("reveal-visible");
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-direction={direction}
      className={`scroll-reveal ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function ScrollStagger({ children, className = "" }: { children: ReactNode; className?: string; stagger?: number; once?: boolean }) {
  return <div className={className}>{children}</div>;
}

export const staggerItem = {};

export function ParallaxSection({ children, className = "" }: { children: ReactNode; className?: string; speed?: number }) {
  return <div className={className}>{children}</div>;
}
