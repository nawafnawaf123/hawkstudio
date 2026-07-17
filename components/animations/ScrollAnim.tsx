"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    setReady(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setVisible(false);
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
      className={`scroll-reveal ${ready ? "reveal-ready" : ""} ${visible ? "reveal-visible" : ""} ${className}`}
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
