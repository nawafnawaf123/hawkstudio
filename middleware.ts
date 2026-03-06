import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // ✅ لا تطبق الصيانة على: ملفات next/static, api, admin, صفحة الصيانة نفسها
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/maintenance") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  try {
    // ✅ قراءة حالة الصيانة من endpoint عام (nodejs)
    const res = await fetch(`${origin}/api/public/settings`, {
      cache: "no-store",
      headers: { "x-internal-middleware": "1" },
    });

    if (res.ok) {
      const data = await res.json().catch(() => null);

      if (data?.maintenanceMode) {
        // ✅ Redirect (أفضل من rewrite)
        const url = req.nextUrl.clone();
        url.pathname = "/maintenance";
        url.search = "";
        return NextResponse.redirect(url);
      }
    }
  } catch {
    // إذا فشل الطلب لا توقف الموقع
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};