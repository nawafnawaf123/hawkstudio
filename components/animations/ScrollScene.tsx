"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollScene({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = ref.current;
    if (!scene || typeof IntersectionObserver === "undefined") return;

    let active = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!active) return;

      const rect = scene.getBoundingClientRect();
      const range = window.innerHeight + rect.height;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / range, 0), 1);
      const rotate = (1 - progress) * 5.5;
      const scale = 0.965 + progress * 0.035;
      const y = (0.5 - progress) * 18;

      scene.style.setProperty("--scene-rotate", `${rotate.toFixed(2)}deg`);
      scene.style.setProperty("--scene-scale", scale.toFixed(4));
      scene.style.setProperty("--scene-y", `${y.toFixed(2)}px`);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) requestUpdate();
    }, { rootMargin: "18% 0px 18% 0px" });

    observer.observe(scene);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`scroll-scene ${className}`}>
      <div className="scroll-scene-inner">{children}</div>
    </div>
  );
}
