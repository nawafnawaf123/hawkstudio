"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type WheelEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { motionConfig } from "@/lib/motion";
import { projects } from "@/lib/projects";

type Position = "active" | "previous" | "next" | "hidden";

const labels = {
  ar: {
    eyebrow: "مشاريع مختارة",
    instruction: "اسحب لاستكشاف التجارب",
    previous: "المشروع السابق",
    next: "المشروع التالي",
    goTo: "انتقل إلى المشروع",
  },
  en: {
    eyebrow: "Selected projects",
    instruction: "Drag to explore the work",
    previous: "Previous project",
    next: "Next project",
    goTo: "Go to project",
  },
} as const;

function projectPosition(index: number, active: number): Position {
  const total = projects.length;
  let offset = (index - active + total) % total;
  if (offset > total / 2) offset -= total;
  if (offset === 0) return "active";
  if (offset === -1 || (total === 2 && offset === 1)) return "previous";
  if (offset === 1) return "next";
  return "hidden";
}

export function ProjectShowcase() {
  const { lang } = useLang();
  const c = labels[lang];
  const shellRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const dragXRef = useRef(0);
  const frameRef = useRef(0);
  const wheelAtRef = useRef(0);
  const draggedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const select = useCallback((index: number, interacted = true) => {
    setActive((index + projects.length) % projects.length);
    if (interacted) setHasInteracted(true);
  }, []);

  const previous = useCallback(() => {
    setActive((current) => (current - 1 + projects.length) % projects.length);
    setHasInteracted(true);
  }, []);

  const next = useCallback((interacted = true) => {
    setActive((current) => (current + 1) % projects.length);
    if (interacted) setHasInteracted(true);
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.18 });
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || hasInteracted) return;
    const timer = window.setInterval(() => next(false), motionConfig.carousel.autoplayMs);
    return () => window.clearInterval(timer);
  }, [hasInteracted, next, visible]);

  const setStageProperty = (name: string, value: string) => {
    const shell = shellRef.current;
    if (!shell) return;
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => shell.style.setProperty(name, value));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startXRef.current = event.clientX;
    dragXRef.current = 0;
    draggedRef.current = false;
    setDragging(true);
    setHasInteracted(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const shell = shellRef.current;
    if (!shell) return;

    if (startXRef.current !== null) {
      dragXRef.current = event.clientX - startXRef.current;
      if (Math.abs(dragXRef.current) > 8) draggedRef.current = true;
      setStageProperty("--showcase-drag", `${Math.max(-110, Math.min(110, dragXRef.current))}px`);
      return;
    }

    if (event.pointerType !== "mouse") return;
    const rect = shell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * motionConfig.parallax.desktop;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -motionConfig.parallax.desktop;
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      shell.style.setProperty("--showcase-tilt-y", `${x.toFixed(2)}deg`);
      shell.style.setProperty("--showcase-tilt-x", `${y.toFixed(2)}deg`);
      shell.style.setProperty("--showcase-light-x", `${event.clientX - rect.left}px`);
      shell.style.setProperty("--showcase-light-y", `${event.clientY - rect.top}px`);
    });
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (startXRef.current === null) return;
    const distance = dragXRef.current;
    if (Math.abs(distance) >= motionConfig.carousel.dragThreshold) {
      distance > 0 ? previous() : next();
    }
    startXRef.current = null;
    dragXRef.current = 0;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setStageProperty("--showcase-drag", "0px");
  };

  const handlePointerLeave = () => {
    if (startXRef.current !== null) return;
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.setProperty("--showcase-tilt-x", "0deg");
    shell.style.setProperty("--showcase-tilt-y", "0deg");
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const now = performance.now();
    if (Math.abs(delta) < motionConfig.carousel.wheelThreshold || now - wheelAtRef.current < 650) return;
    wheelAtRef.current = now;
    delta > 0 ? next() : previous();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(projects.length - 1);
    }
  };

  const handleProjectOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!draggedRef.current) return;
    event.preventDefault();
    draggedRef.current = false;
  };

  return (
    <div
      id="projects"
      ref={shellRef}
      className={`project-showcase ${dragging ? "is-dragging" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={c.eyebrow}
      tabIndex={0}
      data-cursor="drag"
      data-cursor-color="#b8ff45"
      onKeyDown={handleKeyboard}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onPointerLeave={handlePointerLeave}
      onWheel={handleWheel}
      style={{
        "--showcase-drag": "0px",
        "--showcase-tilt-x": "0deg",
        "--showcase-tilt-y": "0deg",
        "--showcase-light-x": "50%",
        "--showcase-light-y": "40%",
      } as CSSProperties}
    >
      <div className="showcase-head">
        <span><i />{c.eyebrow}</span>
        <small>{active + 1} / {projects.length}</small>
      </div>

      <div className="showcase-stage">
        <div className="showcase-disc" aria-hidden="true"><i /><i /><i /></div>
        <div className="showcase-cards">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              position={projectPosition(index, active)}
              onOpen={handleProjectOpen}
            />
          ))}
        </div>
        <div className="showcase-reflection" aria-hidden="true" />
      </div>

      <div className="showcase-footer">
        <span className="showcase-instruction">{c.instruction}</span>
        <div className="showcase-dots" role="tablist" aria-label={c.eyebrow}>
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`${c.goTo} ${index + 1}`}
              onClick={() => select(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="showcase-controls">
          <button type="button" onClick={previous} aria-label={c.previous}><ChevronLeft /></button>
          <button type="button" onClick={() => next()} aria-label={c.next}><ChevronRight /></button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{projects[active].copy[lang].title}</p>
    </div>
  );
}
