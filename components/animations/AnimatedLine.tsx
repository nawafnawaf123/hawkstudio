import type { RefObject } from "react";

export function AnimatedLine({ pathRef }: { pathRef: RefObject<SVGPathElement | null> }) {
  return (
    <svg
      className="page-motion-line"
      viewBox="0 0 18 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="page-motion-line-track" d="M9 0v58c0 17-7 24-7 42s14 25 14 43-7 25-7 42v35" />
      <path ref={pathRef} className="page-motion-line-live" pathLength="1" d="M9 0v58c0 17-7 24-7 42s14 25 14 43-7 25-7 42v35" />
    </svg>
  );
}
