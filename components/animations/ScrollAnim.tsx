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
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) { element.classList.add("reveal-visible"); return; }
    // Above-fold content stays visible; only reveal elements entering from below.
    if (element.getBoundingClientRect().top < window.innerHeight * .95 && once) { element.classList.add("reveal-visible"); return; }
    element.classList.add("reveal-ready");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("reveal-visible");
        if (once) observer.disconnect();
      } else if (!once) {
        element.classList.remove("reveal-visible");
      }
    }, { rootMargin: "0px 0px -4% 0px", threshold: 0.02 });

    observer.observe(element);
    const reduce = () => { if (motion.matches) { element.classList.add("reveal-visible"); observer.disconnect(); } };
    motion.addEventListener("change", reduce);
    return () => { observer.disconnect(); motion.removeEventListener("change", reduce); };
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
