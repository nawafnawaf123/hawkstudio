import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@hawk.studio").toLowerCase().trim();
  const password = "Admin@12345";

  // ✅ Create admin if not exists
  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name: "Hawk Admin",
        email,
        passwordHash,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin created:");
    console.log("Email:", email);
    console.log("Password:", password);
  } else {
    console.log("ℹ️ Admin already exists:", email);
  }

  // ✅ Settings init
  const s = await prisma.setting.findFirst();
  if (!s) {
    await prisma.setting.create({
      data: {
        siteName: "Hawk Studio",
        siteDescription:
          "حلول برمجية احترافية، مواقع وتطبيقات، وتجارب رقمية بهوية سينمائية.",
        siteUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
        contactPhone: process.env.CONTACT_PHONE || "+96170000000",
        contactWhatsApp: process.env.CONTACT_WHATSAPP || "+96170000000",
        contactEmail: process.env.CONTACT_EMAIL || "hello@hawk.studio",
        maintenanceMode: false,
        socialGithub: "",
        socialInstagram: "",
        socialLinkedIn: "",
        socialX: "",
      },
    });
    console.log("✅ Settings initialized");
  }

  // ✅ Demo projects (optional)
  const count = await prisma.project.count();
  if (count === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Hawk POS System",
          slug: "hawk-pos",
          summary: "نظام نقاط بيع متكامل مع إدارة مخزون وتقارير.",
          content:
            "مشروع POS متكامل لإدارة المبيعات والمخزون والفواتير مع واجهة سريعة وحديثة.",
          coverImage: "/uploads/demo-1.png",
          images: JSON.stringify(["/uploads/demo-1.png", "/uploads/demo-2.png"]),
          tech: JSON.stringify(["Next.js", "TypeScript", "Prisma"]),
          liveUrl: "https://example.com",
          repoUrl: "",
          featured: true,
          published: true,
        },
      ],
    });
    console.log("✅ Demo projects added");
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });