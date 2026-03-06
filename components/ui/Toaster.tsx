"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Toast = {
  id: string;
  title: string;
  description?: string;
};

let listeners: ((t: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

export function toast(input: Omit<Toast, "id">) {
  const t: Toast = { id: crypto.randomUUID(), ...input };
  toasts = [t, ...toasts].slice(0, 4);
  listeners.forEach((l) => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter((x) => x.id !== t.id);
    listeners.forEach((l) => l(toasts));
  }, 4200);
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    const l = (t: Toast[]) => setItems(t);
    listeners.push(l);
    l(toasts);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  return (
    <div className="fixed left-4 top-4 z-[60] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3">
      {items.map((t) => (
        <div key={t.id} className="card p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">{t.title}</div>
              {t.description ? (
                <div className="mt-1 text-xs text-white/70">{t.description}</div>
              ) : null}
            </div>
            <button
              onClick={() => {
                toasts = toasts.filter((x) => x.id !== t.id);
                listeners.forEach((l) => l(toasts));
              }}
              className={cn("btn px-2 py-2")}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
