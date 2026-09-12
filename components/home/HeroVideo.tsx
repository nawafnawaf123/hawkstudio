"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./hero-video.css";

const POSTER = "/media/hawk-hero-v1-poster.webp";
const FADE_SECONDS = 1.2;

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
type DeviceNavigator = Navigator & { deviceMemory?: number; connection?: Connection };

/** Two persistent decoders: never seek the visible layer or reload between laps. */
export function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLVideoElement>(null);
  const second = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const device = navigator as DeviceNavigator;
    const update = () => setEnabled(
      !motion.matches && !device.connection?.saveData &&
      !["slow-2g", "2g"].includes(device.connection?.effectiveType ?? "") &&
      !(device.deviceMemory && device.deviceMemory <= 2) &&
      !(device.hardwareConcurrency && device.hardwareConcurrency <= 2),
    );
    update();
    motion.addEventListener("change", update);
    device.connection?.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      device.connection?.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !root.current || !first.current || !second.current) return;
    const container = root.current;
    const videos = [first.current, second.current];
    let active = 0;
    let incoming: number | null = null;
    let frame = 0;
    let inView = true;
    let disposed = false;
    let failed = false;
    let revealed = false;
    let lastQualityCheck = 0;
    const pending = new Set<HTMLVideoElement>();
    const useMp4 = new Set<HTMLVideoElement>();
    const presented = new Set<HTMLVideoElement>();
    const frameCallbacks = new Map<HTMLVideoElement, number>();
    const canRun = () => !disposed && !failed && inView && !document.hidden;
    const hasFrame = (video: HTMLVideoElement) => video.readyState >= 2 &&
      video.currentTime > 0 && (!video.requestVideoFrameCallback || presented.has(video));

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      videos.forEach(video => video.pause());
    };
    const showPoster = () => {
      failed = true;
      stop();
      container.dataset.playback = "poster";
      videos.forEach(video => { video.style.opacity = "0"; });
    };
    const play = (video: HTMLVideoElement) => {
      if (!canRun() || pending.has(video)) return;
      if (video.requestVideoFrameCallback && !presented.has(video) && !frameCallbacks.has(video)) {
        frameCallbacks.set(video, video.requestVideoFrameCallback(() => {
          frameCallbacks.delete(video);
          if (!disposed) presented.add(video);
        }));
      }
      if (!video.paused && !video.ended) return;
      pending.add(video);
      video.play().then(() => {
        if (!canRun()) video.pause();
      }).catch((error: DOMException) => {
        // Pausing an in-flight play on scroll/tab hiding is expected.
        if (!disposed && error.name === "NotSupportedError") {
          if (!useMp4.has(video)) fallback(video);
        }
        else if (!disposed && error.name !== "AbortError") showPoster();
      }).finally(() => { pending.delete(video); });
    };

    const tick = () => {
      frame = 0;
      if (!canRun()) return;
      const outgoing = videos[active];

      // Keep the poster until actual playback has advanced, not merely metadata.
      if (!revealed && hasFrame(outgoing)) {
        outgoing.style.opacity = String(Math.min(outgoing.currentTime / 0.45, 1));
        if (outgoing.currentTime >= 0.45) {
          revealed = true;
          container.dataset.playback = "playing";
        }
      }

      if (revealed && incoming === null && Number.isFinite(outgoing.duration) &&
          outgoing.currentTime >= outgoing.duration - FADE_SECONDS) {
        incoming = 1 - active;
        outgoing.style.zIndex = "1";
        videos[incoming].style.zIndex = "2";
        play(videos[incoming]);
        container.dataset.playback = "crossfading";
      }

      if (incoming !== null) {
        const next = videos[incoming];
        if (hasFrame(next)) {
          // Media time freezes on buffering or pause; so does the dissolve.
          // The outgoing frame stays fully opaque underneath throughout.
          const progress = Math.min(next.currentTime / FADE_SECONDS, 1);
          next.style.opacity = String(progress * progress * (3 - 2 * progress));
          if (progress === 1) {
            outgoing.style.opacity = "0";
            outgoing.pause();
            presented.delete(outgoing);
            outgoing.currentTime = 0; // Only rewind the now invisible layer.
            active = incoming;
            incoming = null;
            container.dataset.playback = "playing";
          }
        }
      }

      if (performance.now() - lastQualityCheck > 5000) {
        lastQualityCheck = performance.now();
        const quality = outgoing.getVideoPlaybackQuality?.();
        if (quality && quality.totalVideoFrames > 120 &&
            quality.droppedVideoFrames / quality.totalVideoFrames > 0.25) {
          showPoster();
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      if (!canRun()) { stop(); return; }
      // An ended outgoing video must hold its final frame until the incoming
      // layer is ready. Calling play() on it would cause a visible restart.
      if (!videos[active].ended) play(videos[active]);
      if (incoming !== null) play(videos[incoming]);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const fallback = (video: HTMLVideoElement) => {
      // Covers WebM decode failures as well as unsupported codec selection.
      if (!useMp4.has(video)) {
        useMp4.add(video);
        video.src = "/media/hawk-hero-v1.mp4";
        video.load();
        sync();
      } else showPoster();
    };
    const handleError = (event: Event) => fallback(event.currentTarget as HTMLVideoElement);

    videos.forEach(video => {
      video.muted = true;
      video.addEventListener("error", handleError);
      video.addEventListener("canplay", sync);
    });
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0 });
    observer.observe(container);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      videos.forEach(video => {
        video.removeEventListener("error", handleError);
        video.removeEventListener("canplay", sync);
        const callback = frameCallbacks.get(video);
        if (callback !== undefined) video.cancelVideoFrameCallback(callback);
      });
    };
  }, [enabled]);

  return (
    <div ref={root} className="hero-video" aria-hidden="true" data-playback="poster">
      <Image src={POSTER} alt="" fill priority unoptimized sizes="100vw" className="hero-video-poster" />
      {enabled && [first, second].map((ref, index) => (
        <video
          key={index}
          ref={ref}
          className="hero-video-layer"
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          poster={POSTER}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        >
          <source src="/media/hawk-hero-v1.webm" type="video/webm" />
          <source src="/media/hawk-hero-v1.mp4" type="video/mp4" />
        </video>
      ))}
      <div className="hero-video-overlay" />
    </div>
  );
}
