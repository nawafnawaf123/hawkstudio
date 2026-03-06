import { requireAdmin } from "@/lib/require-admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsEditor } from "@/components/admin/SettingsEditor";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const s = await prisma.setting.findFirst();

  const initial = s || {
    siteName: "Hawk Studio",
    siteDescription: "حلول برمجية احترافية، مواقع وتطبيقات، وتجارب رقمية بهوية سينمائية.",
    siteUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
    contactPhone: process.env.CONTACT_PHONE || "+96170000000",
    contactWhatsApp: process.env.CONTACT_WHATSAPP || "+96170000000",
    contactEmail: process.env.CONTACT_EMAIL || "hello@hawk.studio",
    maintenanceMode: false,
    socialGithub: "",
    socialLinkedIn: "",
    socialInstagram: "",
    socialX: "",
  };

  return (
    <AdminShell title="Settings">
      <SettingsEditor
        initial={{
          siteName: initial.siteName,
          siteDescription: initial.siteDescription,
          siteUrl: initial.siteUrl,
          contactPhone: initial.contactPhone,
          contactWhatsApp: initial.contactWhatsApp,
          contactEmail: initial.contactEmail,
          maintenanceMode: initial.maintenanceMode,
          socialGithub: initial.socialGithub || "",
          socialLinkedIn: initial.socialLinkedIn || "",
          socialInstagram: initial.socialInstagram || "",
          socialX: initial.socialX || "",
        }}
      />
    </AdminShell>
  );
}
