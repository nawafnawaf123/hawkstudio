"use client";

import { useEffect, useRef, useState } from "react";
import { Braces, Layers3, Smartphone } from "lucide-react";
import { useLang } from "@/components/locale/LanguageProvider";

const copy = {
  ar: {
    kicker: "المشهد الرقمي",
    title: "نحوّل الفكرة إلى عالم يتحرّك حول جمهورك.",
    scenes: [
      ["نصمّم الإحساس", "طبقات بصرية جريئة، عمق محسوب، وهوية تتحرك وكأنها كائن حي."],
      ["نبرمج الحركة", "كل انتقال وتفاعل مبني ليكون سريعاً، دقيقاً، ومتناغماً مع القصة."],
      ["نطلق على كل شاشة", "تجربة واحدة متماسكة بين الويب وAndroid وiOS."],
    ],
    hint: "يتبدّل المشهد تلقائياً كل 6 ثوانٍ",
  },
  en: {
    kicker: "The digital scene",
    title: "We turn an idea into a world that moves around your audience.",
    scenes: [
      ["Design the feeling", "Bold visual layers, intentional depth, and an identity that moves like a living system."],
      ["Engineer the motion", "Every transition and interaction is built to feel fast, precise, and connected to the story."],
      ["Launch on every screen", "One coherent experience across web, Android, and iOS."],
    ],
    hint: "Scenes advance automatically every 6 seconds",
  },
} as const;

const icons = [Layers3, Braces, Smartphone];

export function CinematicEngine() {
  const { lang } = useLang();
  const c = copy[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    let timer = 0;
    let visible = false;
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };
    const start = () => {
      stop();
      if (!visible || document.hidden) return;
      timer = window.setInterval(() => {
        setActive((current) => (current + 1) % 3);
      }, 6000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    }, { rootMargin: "20% 0px", threshold: 0.08 });
    const handleVisibility = () => document.hidden ? stop() : start();

    observer.observe(section);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      stop();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cinematic-engine"
      data-active={active}
      data-cursor-color={active === 1 ? "#66e3ff" : active === 2 ? "#ff7a45" : "#b8ff45"}
    >
      <div className="cinematic-engine-sticky">
        <div className="cinematic-engine-grid" aria-hidden="true" />
        <div className="cinematic-engine-head">
          <span>HAWK / MOTION PICTURE</span>
          <span><i /> LIVE 03 SCENES</span>
        </div>

        <div className="cinematic-engine-copy">
          <span className="section-kicker"><b>01.5</b>{c.kicker}</span>
          <h2>{c.title}</h2>
          <div className="cinematic-engine-notes">
            {c.scenes.map(([title, description], index) => {
              const Icon = icons[index];
              return (
                <button
                  type="button"
                  className={active === index ? "is-active" : ""}
                  onClick={() => setActive(index)}
                  aria-pressed={active === index}
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

        <div className="cinematic-engine-stage" aria-hidden="true">
          <div className="cinematic-scene cinematic-scene-design">
            <span className="design-orbit design-orbit-a" />
            <span className="design-orbit design-orbit-b" />
            <div className="design-glass-card design-card-a"><small>BRAND / 01</small><strong>FORM</strong><i /></div>
            <div className="design-glass-card design-card-b"><small>UI / 02</small><strong>FEEL</strong><i /></div>
            <div className="design-glass-card design-card-c"><small>MOTION / 03</small><strong>FLOW</strong><i /></div>
          </div>

          <div className="cinematic-scene cinematic-scene-code">
            <div className="code-window">
              <span className="code-window-top"><i /><i /><i /><b>hawk.motion.ts</b></span>
              <span className="code-line"><i>01</i><b>const</b> experience = motion.create&#40;&#123;</span>
              <span className="code-line"><i>02</i>&nbsp;&nbsp;depth: <em>true</em>,</span>
              <span className="code-line"><i>03</i>&nbsp;&nbsp;speed: <em>&quot;instant&quot;</em>,</span>
              <span className="code-line"><i>04</i>&nbsp;&nbsp;feeling: <em>&quot;unforgettable&quot;</em></span>
              <span className="code-line"><i>05</i>&#125;&#41;;</span>
              <span className="code-scan" />
            </div>
            <span className="code-wave">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</span>
          </div>

          <div className="cinematic-scene cinematic-scene-mobile">
            <div className="phone-model phone-model-a"><span><b>HAWK</b><i /><i /><i /></span></div>
            <div className="phone-model phone-model-b"><span><b>01</b><i /><i /><i /></span></div>
          </div>
        </div>

        <div className="cinematic-engine-footer">
          <span>{c.hint}</span>
          <div><i /><i /><i /></div>
          <strong>0{active + 1} / 03</strong>
        </div>
      </div>
    </section>
  );
}
