"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Braces, PenTool, Smartphone } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";
import { ScrollAnim } from "@/components/animations/ScrollAnim";

const copy = {
  ar: {
    eyebrow: "مختبر الحركة",
    title: "التصميم والبرمجة والموبايل في إشارة واحدة.",
    live: "النظام يعمل",
    items: [
      ["نصمّم بجرأة", "هوية وواجهات تحوّل الفكرة إلى حضور واضح لا يُنسى."],
      ["نبني بدقة", "كود سريع، متجاوب، ومصقول حتى آخر حركة وتفصيلة."],
      ["نطلق لكل شاشة", "مواقع وتطبيقات Android وiOS بتجربة واحدة متماسكة."],
    ],
  },
  en: {
    eyebrow: "Motion signal lab",
    title: "Design, code, and mobile—moving as one system.",
    live: "System online",
    items: [
      ["Design boldly", "Identity and interfaces that turn an idea into unmistakable presence."],
      ["Build precisely", "Fast, responsive code refined down to the final movement and detail."],
      ["Launch everywhere", "Websites, Android, and iOS products shaped as one coherent experience."],
    ],
  },
} as const;

const icons = [PenTool, Braces, Smartphone];
const chips = ["WEB", "ANDROID", "iOS", "MOTION"];

export function MotionSignalLab() {
  const { lang } = useLang();
  const c = copy[lang];
  const shellRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % c.items.length), 2600);
    return () => window.clearInterval(timer);
  }, [visible, c.items.length]);

  const moveSignal = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    shellRef.current.style.setProperty("--signal-x", `${x.toFixed(2)}px`);
    shellRef.current.style.setProperty("--signal-y", `${y.toFixed(2)}px`);
  };

  const resetSignal = () => {
    shellRef.current?.style.setProperty("--signal-x", "0px");
    shellRef.current?.style.setProperty("--signal-y", "0px");
  };

  return (
    <section className="motion-lab-section container-x">
      <ScrollAnim direction="zoom" className="motion-lab-reveal">
        <div
          ref={shellRef}
          className="motion-lab-shell"
          data-active={active}
          onPointerMove={moveSignal}
          onPointerLeave={resetSignal}
          style={{ "--signal-x": "0px", "--signal-y": "0px" } as CSSProperties}
        >
          <div className="motion-lab-head">
            <span>HAWK / SIGNAL SYSTEM</span>
            <span className="motion-lab-live"><i />{c.live}</span>
          </div>

          <div className="motion-lab-grid">
            <div className="motion-lab-stage" aria-hidden="true">
              <span className="motion-lab-word">HAWK</span>
              <span className="motion-lab-orbit motion-lab-orbit-a"><i /></span>
              <span className="motion-lab-orbit motion-lab-orbit-b"><i /></span>
              <span className="motion-lab-crosshair" />
              <div className="motion-lab-core">
                <small>0{active + 1}</small>
                <b>{c.eyebrow}</b>
              </div>
              <div className="motion-lab-chips">
                {chips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            </div>

            <div className="motion-lab-copy">
              <span className="section-kicker"><b>02.5</b>{c.eyebrow}</span>
              <h2>{c.title}</h2>
              <div className="motion-lab-list">
                {c.items.map(([title, description], index) => {
                  const Icon = icons[index];
                  return (
                    <button
                      type="button"
                      className={index === active ? "is-active" : ""}
                      aria-pressed={index === active}
                      onClick={() => setActive(index)}
                      onPointerEnter={() => setActive(index)}
                      key={title}
                    >
                      <span>0{index + 1}</span>
                      <i><Icon /></i>
                      <span><strong>{title}</strong><small>{description}</small></span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="motion-lab-progress" aria-hidden="true">
            <i style={{ transform: `scaleX(${(active + 1) / c.items.length})` }} />
            {c.items.map((_, index) => <span className={index <= active ? "is-active" : ""} key={index}>0{index + 1}</span>)}
          </div>
        </div>
      </ScrollAnim>
    </section>
  );
}
