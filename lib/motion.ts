export const motionConfig = {
  duration: {
    instant: 160,
    quick: 260,
    standard: 560,
    cinematic: 920,
  },
  carousel: {
    autoplayMs: 5200,
    wheelThreshold: 28,
    dragThreshold: 54,
  },
  parallax: {
    desktop: 14,
    mobile: 5,
  },
  effects: {
    glassBlur: 18,
    mobileGlassBlur: 10,
    glow: "rgba(184, 255, 69, 0.28)",
  },
  media: {
    mobile: "(max-width: 720px)",
    touch: "(hover: none), (pointer: coarse)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
  },
} as const;

export type MotionConfig = typeof motionConfig;
