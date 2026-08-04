"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const drop = dropRef.current;
    const label = labelRef.current;
    if (!cursor || !drop || !label) return;

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    let targetX = -80;
    let targetY = -80;
    let currentX = -80;
    let currentY = -80;
    let previousX = -80;
    let previousY = -80;
    let angle = 0;
    let lastTime = 0;
    let ready = false;
    let frame = 0;

    const render = (time: number) => {
      frame = 0;
      const delta = Math.min(Math.max(time - lastTime, 8), 34);
      lastTime = time;
      const spring = 1 - Math.exp(-22 * (delta / 1000));

      currentX += (targetX - currentX) * spring;
      currentY += (targetY - currentY) * spring;

      const velocityX = currentX - previousX;
      const velocityY = currentY - previousY;
      const velocity = Math.hypot(velocityX, velocityY);
      const speed = Math.min(velocity / 12, 1);

      if (velocity > 0.035) {
        const targetAngle = Math.atan2(velocityY, velocityX);
        const angleDelta = Math.atan2(Math.sin(targetAngle - angle), Math.cos(targetAngle - angle));
        angle += angleDelta * Math.min(0.32 + speed * 0.18, 0.52);
      }

      const stretch = 1 + speed * 0.48;
      const squash = 1 - speed * 0.22;
      cursor.style.transform = `translate3d(${currentX}px,${currentY}px,0)`;
      drop.style.setProperty("--drop-angle", `${angle}rad`);
      drop.style.setProperty("--drop-stretch", stretch.toFixed(3));
      drop.style.setProperty("--drop-squash", squash.toFixed(3));
      drop.style.setProperty("--drop-speed", speed.toFixed(3));
      drop.style.setProperty("--drop-tail-a", `${(0.55 + speed * 0.6).toFixed(3)}rem`);
      drop.style.setProperty("--drop-tail-b", `${(0.9 + speed * 1.05).toFixed(3)}rem`);
      drop.style.setProperty("--drop-bubble-a-scale", (0.45 + speed * 0.55).toFixed(3));
      drop.style.setProperty("--drop-bubble-b-scale", (0.25 + speed * 0.75).toFixed(3));

      previousX = currentX;
      previousY = currentY;

      const remaining = Math.hypot(targetX - currentX, targetY - currentY);
      if (remaining > 0.04 || velocity > 0.025) {
        frame = window.requestAnimationFrame(render);
      } else {
        drop.style.setProperty("--drop-stretch", "1");
        drop.style.setProperty("--drop-squash", "1");
        drop.style.setProperty("--drop-speed", "0");
      }
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const surface = document.elementFromPoint(targetX, targetY)?.closest<HTMLElement>("[data-cursor-color]");
      cursor.style.setProperty("--cursor-color", surface?.dataset.cursorColor || "#b8ff45");
      if (!ready) {
        ready = true;
        currentX = targetX;
        currentY = targetY;
        previousX = targetX;
        previousY = targetY;
        lastTime = performance.now();
        document.documentElement.classList.add("has-custom-cursor", "is-cursor-ready");
      }
      cursor.classList.add("is-visible");
      requestRender();
    };
    const handleOver = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const target = element?.closest<HTMLElement>("[data-cursor],a,button") ?? null;
      const colorSurface = element?.closest<HTMLElement>("[data-cursor-color]");
      const mode = target?.dataset.cursor || (target ? "action" : "");
      cursor.dataset.mode = mode;
      label.textContent = mode === "view" ? "VIEW" : mode === "drag" ? "DRAG" : "";
      cursor.style.setProperty("--cursor-color", colorSurface?.dataset.cursorColor || "#b8ff45");
    };
    const handleDown = () => {
      cursor.classList.add("is-down");
      drop.style.setProperty("--drop-press", ".82");
    };
    const handleUp = () => {
      cursor.classList.remove("is-down");
      drop.style.setProperty("--drop-press", "1");
      requestRender();
    };
    const handleLeave = () => cursor.classList.remove("is-visible");

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });
    document.addEventListener("pointerdown", handleDown, { passive: true });
    document.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("pointerleave", handleLeave, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor", "is-cursor-ready");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointerleave", handleLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div
        ref={dropRef}
        className="custom-cursor-drop"
        style={{
          "--drop-angle": "0rad",
          "--drop-stretch": "1",
          "--drop-squash": "1",
          "--drop-speed": "0",
          "--drop-press": "1",
          "--drop-tail-a": ".55rem",
          "--drop-tail-b": ".9rem",
          "--drop-bubble-a-scale": ".45",
          "--drop-bubble-b-scale": ".25",
        } as CSSProperties}
      >
        <span className="custom-cursor-skin">
          <i className="custom-cursor-highlight" />
          <i className="custom-cursor-reflection" />
        </span>
        <i className="custom-cursor-bubble custom-cursor-bubble-a" />
        <i className="custom-cursor-bubble custom-cursor-bubble-b" />
      </div>
      <span ref={labelRef} className="custom-cursor-label" />
    </div>
  );
}
