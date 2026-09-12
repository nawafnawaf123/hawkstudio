"use client";

import { PagePrelude } from "@/components/nav/PagePrelude";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="studio-route"><PagePrelude />{children}</div>
  );
}
