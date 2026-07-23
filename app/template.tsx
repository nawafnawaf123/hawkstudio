"use client";

import { useEffect } from "react";

let hasMountedTemplate = false;

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  const animateTransition = hasMountedTemplate;

  useEffect(() => {
    hasMountedTemplate = true;
  }, []);

  return (
    <>
      <div
        className={`route-transition ${animateTransition ? "is-active" : "is-initial"}`}
        aria-hidden="true"
      >
        <i /><i /><i /><i />
        <b>HAWK</b>
        <span>DESIGN × CODE × MOTION</span>
      </div>
      <div className="route-content">{children}</div>
    </>
  );
}
