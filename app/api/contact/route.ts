import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(5),
});

async function maybeSendEmail(payload: { name: string; email: string; phone?: string | null; message: string }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.SMTP_FROM;
  const to = process.env.CONTACT_EMAIL;

  if (!host || !user || !pass || !from || !to) return;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject: `New message — Hawk Studio (${payload.name})`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || ""}\n\n${payload.message}`,
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const d = parsed.data;

  await prisma.contactMessage.create({
    data: {
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      message: d.message,
    },
  });

  // optional email
  try {
    await maybeSendEmail(d);
  } catch {}

  return NextResponse.json({ ok: true });
}
