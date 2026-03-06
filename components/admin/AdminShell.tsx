"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutGrid, Settings, LogOut, PlusCircle } from "lucide-react";

export function AdminShell({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <aside className="lg:col-span-1">
        <div className="card p-4">
          <div className="text-sm font-semibold">Admin</div>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className="btn justify-start" href="/admin/projects">
              <LayoutGrid className="h-4 w-4 text-neon-300/90" />
              Projects
            </Link>
            <Link className="btn justify-start" href="/admin/settings">
              <Settings className="h-4 w-4 text-neon-300/90" />
              Settings
            </Link>

            <button
              className="btn justify-start"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="h-4 w-4 text-neon-300/90" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <section className="lg:col-span-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs text-white/55">Hawk Studio</div>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <Link className="btn btn-primary" href="/admin/projects/new">
              <PlusCircle className="h-4 w-4" />
              New
            </Link>
          </div>
        </div>

        <div className="mt-5">{children}</div>
      </section>
    </div>
  );
}
