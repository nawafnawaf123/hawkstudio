# Hawk Studio — Homepage Motion Override

This page override adapts the UI/UX Pro Max “Kinetic Brutalism / Immersive Editorial”
direction to the existing Hawk identity.

## Locked brand tokens

- Ink: `#10100F`
- Warm ivory: `#F2F0E9`
- Lime signal: `#B8FF45`
- Muted light: `#A5A69E`
- Arabic: Alexandria
- English: Manrope

## Motion language

- Bold asymmetric composition with spacious editorial rhythm.
- Use transform and opacity only for continuous motion.
- Scroll reveals: 400–700ms with short 30–80ms staggers.
- Parallax belongs to decorative layers, never body copy or controls.
- One perspective-scroll scene per page; no scroll locking or pinned sections.
- Persistent animation runs only while its section is visible.
- Buttons may use a restrained magnetic response on fine pointers.
- Mobile uses a vertical composition and smaller motion deltas.

## Component direction

- `MotionSignalLab`: interactive design/code/mobile signal system.
- `ScrollScene`: subtle 3D hero-stage settle tied to native scroll.
- `MagneticLink`: tactile CTA response without layout movement.
- Cinematic footer: giant outlined typography, grid, lime scanning rail.
- Route curtain: short transform-only transition between pages.

## Performance constraints

- No canvas, WebGL, GSAP, or Framer Motion.
- No animation of width, height, top, or left.
- Use passive listeners and `requestAnimationFrame`.
- Preserve semantic content without JavaScript.
- Keep all controls at least 44×44px with visible focus states.
