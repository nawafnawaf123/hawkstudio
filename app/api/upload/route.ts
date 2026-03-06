import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

function safeName(name: string) {
  const base = name.replace(/[^\w.-]/g, "_");
  const stamp = Date.now().toString(36);
  return `${stamp}-${base}`;
}

export async function POST(req: Request) {
  await requireAdmin();

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const filename = safeName(file.name || "upload.bin");

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buf);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
