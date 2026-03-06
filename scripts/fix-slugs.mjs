import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(input = "") {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "asc" },
  });

  const used = new Set(projects.map((p) => (p.slug || "").toLowerCase()));

  let fixed = 0;

  for (const p of projects) {
    const cur = (p.slug || "").trim();

    if (cur.length >= 2) continue;

    // حاول من العنوان
    let base = slugify(p.title);

    // لو العنوان عربي/طلع فاضي → استخدم id
    if (!base || base.length < 2) base = `project-${p.id.slice(-8)}`;

    // ضمان uniqueness
    let slug = base;
    let i = 1;
    while (used.has(slug.toLowerCase())) {
      slug = `${base}-${i++}`;
    }

    await prisma.project.update({
      where: { id: p.id },
      data: { slug },
    });

    used.add(slug.toLowerCase());
    fixed++;
    console.log(`✅ Fixed: ${p.title} -> ${slug}`);
  }

  console.log(`\nDone. Fixed slugs: ${fixed}`);
}

main()
  .catch((e) => {
    console.error("❌ Fix slugs error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });