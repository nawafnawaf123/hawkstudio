import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { normalizeSettings } from "@/lib/settings";
import { z } from "zod";

const schema = z.object({
  siteName: z.string().optional().nullable(),
  siteDescription: z.string().optional().nullable(),
  siteUrl: z.string().optional().nullable(),
  contactPhone: z.string().optional().nullable(),
  contactWhatsApp: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  maintenanceMode: z.boolean().optional(),
  socialInstagram: z.string().optional().nullable(),
  socialX: z.string().optional().nullable(),
  socialLinkedIn: z.string().optional().nullable(),
  socialGithub: z.string().optional().nullable(),
});

export async function PUT(req: Request) {
  await requireAdmin();

  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.parse(body || {});

    const existing = await prisma.setting.findFirst();

    const merged = normalizeSettings({
      ...(existing || {}),
      ...parsed,
      maintenanceMode:
        typeof parsed.maintenanceMode === "boolean"
          ? parsed.maintenanceMode
          : existing?.maintenanceMode || false,
    });

    const row = existing
      ? await prisma.setting.update({
          where: { id: existing.id },
          data: {
            siteName: merged.siteName,
            siteDescription: merged.siteDescription,
            siteUrl: merged.siteUrl,
            contactPhone: merged.contactPhone,
            contactWhatsApp: merged.contactWhatsApp,
            contactEmail: merged.contactEmail,
            maintenanceMode: merged.maintenanceMode,
            socialGithub: merged.socialGithub || "",
            socialInstagram: merged.socialInstagram || "",
            socialLinkedIn: merged.socialLinkedIn || "",
            socialX: merged.socialX || "",
          },
        })
      : await prisma.setting.create({
          data: {
            siteName: merged.siteName,
            siteDescription: merged.siteDescription,
            siteUrl: merged.siteUrl,
            contactPhone: merged.contactPhone,
            contactWhatsApp: merged.contactWhatsApp,
            contactEmail: merged.contactEmail,
            maintenanceMode: merged.maintenanceMode,
            socialGithub: merged.socialGithub || "",
            socialInstagram: merged.socialInstagram || "",
            socialLinkedIn: merged.socialLinkedIn || "",
            socialX: merged.socialX || "",
          },
        });

    return NextResponse.json({ ok: true, id: row.id, settings: merged });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: "Save failed",
        details: e?.issues || e?.message || e,
      },
      { status: 400 }
    );
  }
}