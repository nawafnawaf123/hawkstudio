"use client";

import {
  useCallback,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEvent,
} from "react";

type TiltSurfaceProps = ComponentPropsWithoutRef<"article"> & {
  intensity?: number;
};

export function TiltSurface({
  className = "",
  intensity = 7,
  children,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: TiltSurfaceProps) {
  const frameRef = useRef(0);
  const stateRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, glareX: 50, glareY: 50 });

  const animate = useCallback((element: HTMLElement) => {
    frameRef.current = 0;
    const state = stateRef.current;
    state.x += (state.targetX - state.x) * 0.16;
    state.y += (state.targetY - state.y) * 0.16;

    element.style.setProperty("--tilt-x", `${state.x.toFixed(3)}deg`);
    element.style.setProperty("--tilt-y", `${state.y.toFixed(3)}deg`);
    element.style.setProperty("--tilt-glare-x", `${state.glareX.toFixed(1)}%`);
    element.style.setProperty("--tilt-glare-y", `${state.glareY.toFixed(1)}%`);

    if (Math.abs(state.targetX - state.x) > 0.015 || Math.abs(state.targetY - state.y) > 0.015) {
      frameRef.current = window.requestAnimationFrame(() => animate(element));
    }
  }, []);

  const requestAnimate = useCallback((element: HTMLElement) => {
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(() => animate(element));
    }
  }, [animate]);

  const move = useCallback((event: PointerEvent<HTMLElement>) => {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse") return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    stateRef.current.targetX = (0.5 - y) * intensity;
    stateRef.current.targetY = (x - 0.5) * intensity;
    stateRef.current.glareX = x * 100;
    stateRef.current.glareY = y * 100;
    requestAnimate(element);
  }, [intensity, onPointerMove, requestAnimate]);

  const leave = useCallback((event: PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event);
    stateRef.current.targetX = 0;
    stateRef.current.targetY = 0;
    stateRef.current.glareX = 50;
    stateRef.current.glareY = 50;
    requestAnimate(event.currentTarget);
  }, [onPointerLeave, requestAnimate]);

  return (
    <article
      {...props}
      className={`tilt-surface ${className}`}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{
        "--tilt-x": "0deg",
        "--tilt-y": "0deg",
        "--tilt-glare-x": "50%",
        "--tilt-glare-y": "50%",
        ...style,
      } as CSSProperties}
    >
      <span className="tilt-surface-glare" aria-hidden="true" />
      {children}
    </article>
  );
}
