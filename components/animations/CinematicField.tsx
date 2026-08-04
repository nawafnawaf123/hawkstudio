"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
};

export function CinematicField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const lowPower = coarse || navigator.hardwareConcurrency <= 4 || memory <= 4;
    const points: Point[] = [];
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let visible = !document.hidden;
    let previousTime = 0;

    const rebuild = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.25);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      points.length = 0;
      const idealCount = Math.min(44, Math.round(width / 32));
      const count = coarse ? 18 : lowPower ? Math.min(28, idealCount) : idealCount;
      for (let index = 0; index < count; index += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (coarse ? 0.12 : 0.22),
          vy: (Math.random() - 0.5) * (coarse ? 0.1 : 0.18),
          depth: 0.35 + Math.random() * 0.65,
        });
      }
    };

    const draw = (time = 0) => {
      frame = 0;
      if (!visible) return;
      if (time - previousTime < (coarse ? 34 : lowPower ? 28 : 16)) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      previousTime = time;
      context.clearRect(0, 0, width, height);

      const scroll = window.scrollY * 0.035;
      const horizon = height * 0.72;
      context.save();
      context.globalAlpha = coarse ? 0.12 : 0.18;
      context.strokeStyle = "rgb(184 255 69)";
      context.lineWidth = 0.7;
      for (let index = -7; index <= 7; index += 1) {
        const x = width / 2 + index * width * 0.11;
        context.beginPath();
        context.moveTo(width / 2 + index * 8, horizon);
        context.lineTo(x, height + 30);
        context.stroke();
      }
      for (let index = 0; index < 6; index += 1) {
        const progress = ((index * 92 + scroll) % 550) / 550;
        const y = horizon + progress * progress * (height - horizon + 50);
        context.globalAlpha = (1 - progress) * 0.18;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
      context.restore();

      const connectionDistance = coarse ? 90 : 125;
      const buckets = new Map<string, number[]>();

      points.forEach((point, index) => {
        point.x += point.vx * point.depth;
        point.y += point.vy * point.depth;
        if (point.x < -20) point.x = width + 20;
        if (point.x > width + 20) point.x = -20;
        if (point.y < -20) point.y = height + 20;
        if (point.y > height + 20) point.y = -20;

        if (pointer.active) {
          const dx = pointer.x - point.x;
          const dy = pointer.y - point.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 180 && distance > 0) {
            point.x -= (dx / distance) * (180 - distance) * 0.006 * point.depth;
            point.y -= (dy / distance) * (180 - distance) * 0.006 * point.depth;
          }
        }

        context.beginPath();
        context.fillStyle = `rgba(184,255,69,${0.12 + point.depth * 0.3})`;
        context.arc(point.x, point.y, 0.8 + point.depth * 1.8, 0, Math.PI * 2);
        context.fill();

        const cellX = Math.floor(point.x / connectionDistance);
        const cellY = Math.floor(point.y / connectionDistance);
        const key = `${cellX}:${cellY}`;
        const bucket = buckets.get(key);
        if (bucket) bucket.push(index);
        else buckets.set(key, [index]);
      });

      context.save();
      context.beginPath();
      context.strokeStyle = "rgba(184,255,69,.075)";
      context.lineWidth = 0.55;
      points.forEach((point, index) => {
        const cellX = Math.floor(point.x / connectionDistance);
        const cellY = Math.floor(point.y / connectionDistance);
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const neighbors = buckets.get(`${cellX + offsetX}:${cellY + offsetY}`);
            if (!neighbors) continue;
            neighbors.forEach((secondIndex) => {
              if (secondIndex <= index) return;
              const second = points[secondIndex];
              if (Math.hypot(point.x - second.x, point.y - second.y) > connectionDistance) return;
              context.moveTo(point.x, point.y);
              context.lineTo(second.x, second.y);
            });
          }
        }
      });
      context.stroke();
      context.restore();

      frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const handlePointerLeave = () => { pointer.active = false; };
    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && !frame) frame = window.requestAnimationFrame(draw);
    };

    rebuild();
    draw();
    window.addEventListener("resize", rebuild);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-field" aria-hidden="true" />;
}
