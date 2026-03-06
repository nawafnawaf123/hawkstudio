import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getPublicSettings();

  return NextResponse.json(
    {
      maintenanceMode: settings.maintenanceMode,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}