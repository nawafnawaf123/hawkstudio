import Image from "next/image";
import type { ProjectVisual } from "@/lib/projects";

export function ProjectArtwork({ visual, priority = false }: { visual: ProjectVisual; priority?: boolean }) {
  if (visual === "identity") {
    return (
      <div className="project-artwork project-artwork-identity">
        <Image
          src="/brand/website_light.png"
          alt=""
          fill
          priority={priority}
          quality={82}
          sizes="(max-width: 720px) 78vw, (max-width: 1200px) 55vw, 36vw"
          className="project-brand-image theme-asset-dark"
          draggable={false}
        />
        <Image
          src="/brand/website_dark.png"
          alt=""
          fill
          priority={priority}
          quality={82}
          sizes="(max-width: 720px) 78vw, (max-width: 1200px) 55vw, 36vw"
          className="project-brand-image theme-asset-light"
          draggable={false}
        />
        <span className="project-artwork-scan" />
      </div>
    );
  }

  if (visual === "commerce") {
    return (
      <div className="project-artwork project-artwork-commerce" aria-hidden="true">
        <div className="commerce-top"><i /><span /><span /></div>
        <div className="commerce-layout">
          <aside><i /><i /><i /><i /></aside>
          <div className="commerce-main">
            <div className="commerce-metrics"><span><b>84</b><i /></span><span><b>+27</b><i /></span><span><b>12</b><i /></span></div>
            <div className="commerce-chart"><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="commerce-rail"><span /><span /><span /></div>
          </div>
        </div>
        <strong>CONTROL / 02</strong>
      </div>
    );
  }

  return (
    <div className="project-artwork project-artwork-mobile" aria-hidden="true">
      <div className="mobile-orbit orbit-one" />
      <div className="mobile-orbit orbit-two" />
      <div className="mobile-device device-back">
        <span className="mobile-notch" />
        <div className="mobile-screen"><i /><b /><b /><b /></div>
      </div>
      <div className="mobile-device device-front">
        <span className="mobile-notch" />
        <div className="mobile-screen"><i /><b /><b /><b /></div>
      </div>
      <span className="mobile-signal">ANDROID <i /> iOS</span>
    </div>
  );
}
