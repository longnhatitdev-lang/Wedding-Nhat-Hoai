import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { weddingSettings } from "@/lib/db/schema/wedding";
import type { GiftSettings } from "@/components/layout/gift-settings";
import type { WeddingTexts } from "@/components/layout/editable-text";
import { sides } from "@/components/layout/wedding-data";

export type Side = "trai" | "gai";
export type SideSettings = { date: string; time: string; address: string; map: string; embed: string; lunar: string; texts?: WeddingTexts; gifts?: GiftSettings };
export type AlbumImage = { url: string; caption: string };
export const defaultAlbum: AlbumImage[] = ["/asset/img/aaa.PNG", "/asset/img/mau1.webp", "/asset/img/mau13.webp", "/asset/img/mau2.webp"].map((url) => ({ url, caption: "" }));

export async function readSetting<T>(key: string, fallback: T): Promise<T> {
  const [row] = await db.select().from(weddingSettings).where(eq(weddingSettings.key, key)).limit(1);
  return row ? row.value as T : fallback;
}
export async function getSideSettings(side: Side) { return readSetting<SideSettings>(`side:${side}`, sides[side]); }
export async function getAlbum() { return readSetting<AlbumImage[]>("album", defaultAlbum); }
