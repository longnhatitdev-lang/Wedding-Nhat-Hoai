"use server";

import { db } from "@/lib/db";
import { weddingSettings } from "@/lib/db/schema/wedding";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/admin/session";
import { getAlbum, getSideSettings, type AlbumImage, type Side, type SideSettings } from "@/lib/admin/settings";
import { editableTextSelectors, type WeddingTexts } from "@/components/layout/editable-text";
import type { GiftSettings } from "@/components/layout/gift-settings";
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
  const value: SideSettings = {
    date: data.date.trim(), time: data.time.trim(), address: data.address.trim(),
    map: data.map.trim(), embed: data.embed.trim(), lunar: data.lunar.trim(),
  };
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(value.date) ? new Date(`${value.date}T00:00:00Z`) : new Date(NaN);
  if (!Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== value.date || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value.time) || !value.address || !validUrl(value.map) || !validUrl(value.embed)) throw new Error("Vui lòng kiểm tra ngày, giờ, địa chỉ và đường dẫn HTTPS.");
  const existing = await getSideSettings(side);
  if (data.texts !== undefined) {
    if (!data.texts || typeof data.texts !== "object" || Array.isArray(data.texts)) throw new Error("Nội dung không hợp lệ.");
    const entries = Object.entries(data.texts);
    if (entries.some(([key, text]) => !Object.hasOwn(editableTextSelectors, key) || typeof text !== "string" || text.length > 2000)) throw new Error("Nội dung không hợp lệ.");
    value.texts = Object.fromEntries(entries) as WeddingTexts;
  } else {
    value.texts = existing.texts;
  }
  if (data.gifts !== undefined) {
    const gifts = data.gifts;
    if (!gifts || typeof gifts !== "object") throw new Error("Thông tin mừng cưới không hợp lệ.");
    const clean = {} as GiftSettings;
    for (const role of ["groom", "bride"] as const) {
      const gift = gifts[role];
      if (!gift || [gift.owner, gift.bank, gift.account, gift.qrUrl].some((field) => typeof field !== "string" || field.length > 2000)) throw new Error("Thông tin mừng cưới không hợp lệ.");
      const { owner, bank, account, qrUrl } = gift;
      const qr = qrUrl.trim();
      if (!owner.trim() || !bank.trim() || !account.trim() || !(qr.startsWith("/asset/") || /^\/api\/album-file\/[0-9a-f-]{36}$/i.test(qr) || (qr.startsWith("https://") && validUrl(qr)))) throw new Error("Vui lòng kiểm tra thông tin và mã QR.");
      clean[role] = { owner: owner.trim(), bank: bank.trim(), account: account.trim(), qrUrl: qr };
    }
    value.gifts = clean;
  } else {
    value.gifts = existing.gifts;
  }
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

export async function uploadAlbumImage(file: File): Promise<{ url: string; error?: never } | { error: string; url?: never }> {
  await requireAdmin();
  if (!file || typeof file.arrayBuffer !== "function" || file.size < 12 || file.size > 4 * 1024 * 1024) throw new Error("Chọn ảnh không quá 4 MB.");
  const bytes = Buffer.from(await file.arrayBuffer());
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  const mimeType = jpeg ? "image/jpeg" : png ? "image/png" : webp ? "image/webp" : "";
  if (!mimeType) throw new Error("Chỉ hỗ trợ ảnh JPEG, PNG và WebP.");
  if (!process.env.CLOUDINARY_URL) return { error: "Chưa cấu hình Cloudinary trên máy chủ." };
  return await new Promise<{ url: string; error?: never } | { error: string; url?: never }>((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "wedding-nhat-hoai", resource_type: "image" },
      (error, result) => {
        if (error?.http_code === 403) resolve({ error: "Cloudinary từ chối tải ảnh. Kiểm tra quyền tạo ảnh của API key và thư mục." });
        else if (error || !result?.secure_url) resolve({ error: "Không thể tải ảnh lên Cloudinary. Vui lòng thử lại." });
        else resolve({ url: result.secure_url });
      },
    );
    stream.on("error", () => resolve({ error: "Không thể tải ảnh lên Cloudinary. Vui lòng thử lại." }));
    stream.end(bytes);
  });
}
