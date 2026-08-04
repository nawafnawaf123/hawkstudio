"use client";

import { useEffect, useRef } from "react";

export function HeroAtmosphere() {
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const hero = atmosphere?.parentElement;
    if (!atmosphere || !hero || typeof IntersectionObserver === "undefined") return;

    let active = false;
    let frame = 0;
    let clientX = window.innerWidth * 0.7;
    let clientY = window.innerHeight * 0.35;

    const render = () => {
      frame = 0;
      if (!active) return;
      const rect = hero.getBoundingClientRect();
      atmosphere.style.setProperty("--hero-light-x", `${clientX - rect.left}px`);
      atmosphere.style.setProperty("--hero-light-y", `${clientY - rect.top}px`);
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!active || event.pointerType !== "mouse") return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) render();
    }, { rootMargin: "10% 0px" });

    observer.observe(hero);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={atmosphereRef} className="hero-atmosphere" aria-hidden="true">
      <span className="hero-atmosphere-grid" />
      <span className="hero-atmosphere-light" />
      <i className="hero-atmosphere-line line-a" />
      <i className="hero-atmosphere-line line-b" />
      <i className="hero-atmosphere-dot dot-a" />
      <i className="hero-atmosphere-dot dot-b" />
      <i className="hero-atmosphere-dot dot-c" />
    </div>
  );
}
