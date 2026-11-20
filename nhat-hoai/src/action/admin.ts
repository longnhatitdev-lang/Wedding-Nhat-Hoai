"use server";

import { db } from "@/lib/db";
import { weddingAlbumFiles, weddingSettings } from "@/lib/db/schema/wedding";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/admin/session";
import { getAlbum, getSideSettings, type AlbumImage, type Side, type SideSettings } from "@/lib/admin/settings";
import { revalidatePath } from "next/cache";

export async function getPublicWeddingSettings() {
  const [trai, gai, album] = await Promise.all([getSideSettings("trai"), getSideSettings("gai"), getAlbum()]);
  return { trai, gai, album };
}

async function save(key: string, value: unknown) {
  await db.insert(weddingSettings).values({ key, value }).onConflictDoUpdate({ target: weddingSettings.key, set: { value, updatedAt: new Date() } });
}
const validUrl = (value: string) => { if (!value) return true; try { return new URL(value).protocol === "https:"; } catch { return false; } };

export async function saveSide(side: Side, data: SideSettings) {
  await requireAdmin();
  if (side !== "trai" && side !== "gai") throw new Error("Phía gia đình không hợp lệ.");
  const fields = ["date", "time", "address", "map", "embed", "lunar"] as const;
  if (!data || fields.some((field) => typeof data[field] !== "string" || data[field].length > 2000)) throw new Error("Thông tin không hợp lệ.");
  const value = Object.fromEntries(fields.map((field) => [field, data[field].trim()])) as SideSettings;
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(value.date) ? new Date(`${value.date}T00:00:00Z`) : new Date(NaN);
  if (!Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== value.date || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value.time) || !value.address || !validUrl(value.map) || !validUrl(value.embed)) throw new Error("Vui lòng kiểm tra ngày, giờ, địa chỉ và đường dẫn HTTPS.");
  await save(`side:${side}`, value);
  revalidatePath("/"); revalidatePath("/nha-gai");
  return { success: true };
}
export async function saveAlbum(images: AlbumImage[]) {
  await requireAdmin();
  if (!Array.isArray(images) || images.length > 200) throw new Error("Danh sách ảnh không hợp lệ.");
  const clean = images.map((image) => ({ url: typeof image?.url === "string" ? image.url.trim() : "", caption: typeof image?.caption === "string" ? image.caption.trim() : "" }));
  if (clean.some(({ url, caption }) => url.length > 2000 || caption.length > 180 || !(url.startsWith("/asset/") || url.startsWith("/uploads/") || /^\/api\/album-file\/[0-9a-f-]{36}$/.test(url) || (url.startsWith("https://") && validUrl(url))))) throw new Error("Đường dẫn ảnh không hợp lệ.");
  await save("album", clean);
  revalidatePath("/album");
  return { success: true };
}

export async function uploadAlbumImage(file: File) {
  await requireAdmin();
  if (!file || typeof file.arrayBuffer !== "function" || file.size < 12 || file.size > 4 * 1024 * 1024) throw new Error("Chọn ảnh không quá 4 MB.");
  const bytes = Buffer.from(await file.arrayBuffer());
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  const mimeType = jpeg ? "image/jpeg" : png ? "image/png" : webp ? "image/webp" : "";
  if (!mimeType) throw new Error("Chỉ hỗ trợ ảnh JPEG, PNG và WebP.");
  const id = randomUUID();
  await db.insert(weddingAlbumFiles).values({ id, mimeType, data: bytes.toString("base64") });
  return { url: `/api/album-file/${id}` };
}
