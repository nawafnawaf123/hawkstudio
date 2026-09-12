"use client";

import { useEffect, useState } from "react";
import { PagePrelude } from "@/components/nav/PagePrelude";

let hasMountedTemplate = false;

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  // Capture once per route mount: skip initial hydration, animate later navigations.
  const [animateTransition] = useState(() => hasMountedTemplate);

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
      <div className="studio-route route-content"><PagePrelude />{children}</div>
    </>
  );
}
