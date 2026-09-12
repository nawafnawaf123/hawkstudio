# Cinematic hero background

`HeroVideo.tsx` owns two persistent, decorative video elements. The original
hero copy and links are unchanged; `hero-video.css` places the scene behind the
whole section and adjusts contrast in both themes and text directions.

## Media

Source: `Black_hawk_emerging_from_darkness_20260912171923.mp4` (1920×1080,
24 fps, 10 seconds). The site cut uses 0.25–8.75 seconds, removing the almost
black closing shot. Its beginning and ending are different, so native `loop`
is deliberately disabled. The internal scene changes in the supplied footage
remain part of the video.

- `public/media/hawk-hero-v1.webm`: VP9, 1280×720, CRF 34, no audio.
- `public/media/hawk-hero-v1.mp4`: H.264, 1280×720, CRF 23, YUV420p,
  faststart, no audio; fallback for browsers that cannot decode WebM.
- `public/media/hawk-hero-v1-poster.webp`: original frame at 3.25 seconds,
  1600×900, WebP quality 85. Priority-loaded and present in server-rendered HTML.

Both encodings use a 48-frame keyframe interval. Versioned file names receive
one-year immutable caching in `next.config.mjs`. Increment the version in file
names, component URLs and cache rules when replacing the footage.

## Handoff and failure behavior

At duration minus 1.2 seconds, the hidden element plays from the beginning.
It is revealed only after playback advances and a frame has been presented
(`requestVideoFrameCallback`, or readyState/time on older browsers). Its opacity
follows a smoothstep curve driven by its media time, not a wall-clock timeout.
The outgoing video stays fully opaque underneath until the incoming layer
reaches full opacity, so the blend never exposes an empty background. Only then
is the outgoing element paused, hidden and rewound. Neither `src` nor `load()`
is reset during normal cycles.

When buffering delays a handoff, the outgoing last frame is held. This avoids
a black flash but can briefly freeze on a stalled connection; continuous motion
cannot be guaranteed when the browser stops decoding. Autoplay rejection or
unrecoverable decoding errors keep the poster. WebM decode failure gets a
one-time MP4 fallback. Reduced-motion and data-saving clients do not mount
video elements or request their sources.

Playback and animation-frame polling pause while the hero is offscreen or the
tab is hidden, including midway through a dissolve. Media time preserves the
blend on resume. Devices reporting at most 2 GB of memory or 2 logical cores,
and slow-2G/2G connections, receive the poster. Decoders dropping more than 25%
of frames after at least 120 frames also fall back to the poster. Device hints
are optional; normal playback remains available when they are absent.

## Verification checklist

- Production build, TypeScript and lint.
- Observe at least four natural handoffs; sample opacity around every rewind.
- Pause by scrolling out of view, then return during a dissolve.
- Desktop/mobile layouts, Arabic/English text, light/dark themes.
- Reduced motion at initial load and when toggled during playback: poster,
  zero mounted videos; no initial video requests for reduced motion/save-data.
- Block WebM to exercise MP4; block all video requests or autoplay to exercise
  the poster. Verify content and links remain usable in each case.
- Confirm media cache headers and no new downloads on successive laps.

The background has no controls, sound, pointer interaction, tab stop or
accessibility-tree content. No third-party player or runtime dependency is added.

## Verified on 2026-09-12

Production build (all 12 static pages), TypeScript and ESLint passed. Chromium
desktop at 1440px and mobile viewport at 390px rendered both languages without
horizontal overflow. Four natural rewinds were observed over 34 seconds, with
zero samples exposing the poster/background between layers and only the two
initial video requests. Initial and live reduced-motion, save-data, low-core
device, blocked media, autoplay rejection and MP4 fallback scenarios passed.
Offscreen pause/resume was exercised during a dissolve. A production-server
test held the incoming layer paused until the outgoing video ended: the outgoing
frame remained fully opaque at 8.5 seconds and resumed blending correctly.
Visibility-handler pause/resume and immutable media response headers passed.
The dissolve frames and desktop/mobile screenshots were visually inspected.
These are Chromium checks and viewport emulation, not physical iOS/Safari tests.
