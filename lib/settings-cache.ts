import { getPublicSettings } from "@/lib/settings";

let cached: any = null;
let cachedAt = 0;

export async function getSettingsCached() {
  const now = Date.now();
  if (cached && now - cachedAt < 10_000) return cached; // 10s cache
  cached = await getPublicSettings();
  cachedAt = now;
  return cached;
}
