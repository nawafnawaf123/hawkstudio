"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type VideoShowcaseProps = {
  poster: string;
  mp4?: string;
  webm?: string;
  label: string;
};

const pauseEvent = "hawk:pause-heavy-media";

export function VideoShowcase({ poster, mp4, webm, label }: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const pauseOtherVideo = (event: Event) => {
      const source = (event as CustomEvent<HTMLVideoElement>).detail;
      if (source !== video) void video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
        setReady(true);
        window.dispatchEvent(new CustomEvent(pauseEvent, { detail: video }));
        void video.play().catch(() => undefined);
      } else {
        void video.pause();
      }
    }, { threshold: [0, 0.55, 1] });

    window.addEventListener(pauseEvent, pauseOtherVideo);
    observer.observe(video);
    return () => {
      observer.disconnect();
      window.removeEventListener(pauseEvent, pauseOtherVideo);
      void video.pause();
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) void video.play().catch(() => undefined);
  };

  return (
    <div className="video-showcase">
      <video
        ref={videoRef}
        poster={poster}
        preload={ready ? "metadata" : "none"}
        playsInline
        muted={muted}
        loop
        aria-label={label}
      >
        {ready && webm ? <source src={webm} type="video/webm" /> : null}
        {ready && mp4 ? <source src={mp4} type="video/mp4" /> : null}
      </video>
      <button type="button" onClick={toggleSound} aria-label={muted ? "Enable video sound" : "Mute video"}>
        {muted ? <VolumeX /> : <Volume2 />}
      </button>
    </div>
  );
}
