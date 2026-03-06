import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  try {
    await prisma.project.delete({ where: { id: params.id } });
  } catch {}
  return NextResponse.redirect(new URL("/admin/projects", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
