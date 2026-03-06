import Link from "next/link";
import { type PublicSettings } from "@/lib/settings";
import { Github, Linkedin, Instagram, X } from "lucide-react";

export function Footer({ settings }: { settings: PublicSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container-x py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card p-5">
            <div className="text-sm font-semibold">{settings.siteName}</div>
            <p className="mt-2 text-sm text-white/70">
              {settings.siteDescription}
            </p>
          </div>

          <div className="card p-5">
            <div className="text-sm font-semibold">روابط</div>
            <div className="mt-3 grid gap-2 text-sm text-white/75">
              <Link className="hover:text-white" href="/portfolio">
                الأعمال
              </Link>
              <Link className="hover:text-white" href="/services">
                الخدمات
              </Link>
              <Link className="hover:text-white" href="/about">
                من نحن
              </Link>
              <Link className="hover:text-white" href="/contact">
                تواصل
              </Link>
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm font-semibold">تواصل</div>
            <div className="mt-3 grid gap-2 text-sm text-white/75">
              <div>هاتف: {settings.contactPhone}</div>
              <div>إيميل: {settings.contactEmail}</div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {settings.socialGithub ? (
                <a className="btn px-3" href={settings.socialGithub} target="_blank">
                  <Github className="h-4 w-4 text-neon-300/90" />
                </a>
              ) : null}
              {settings.socialLinkedIn ? (
                <a className="btn px-3" href={settings.socialLinkedIn} target="_blank">
                  <Linkedin className="h-4 w-4 text-neon-300/90" />
                </a>
              ) : null}
              {settings.socialInstagram ? (
                <a className="btn px-3" href={settings.socialInstagram} target="_blank">
                  <Instagram className="h-4 w-4 text-neon-300/90" />
                </a>
              ) : null}
              {settings.socialX ? (
                <a className="btn px-3" href={settings.socialX} target="_blank">
                  <X className="h-4 w-4 text-neon-300/90" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/50">
          © {year} {settings.siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
