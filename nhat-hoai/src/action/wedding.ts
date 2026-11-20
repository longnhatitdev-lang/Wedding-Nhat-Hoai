"use server";

import { asc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { weddingWishes } from "@/lib/db/schema/wedding";

type WishInput = { name: string; side: string; status: string; guests: number; message: string };

export async function getWishes() {
  return db.select().from(weddingWishes).orderBy(asc(weddingWishes.createdAt)).limit(200);
}

export async function addWish(input: WishInput) {
  const name = typeof input?.name === "string" ? input.name.trim().slice(0, 80) : "";
  const message = typeof input?.message === "string" ? input.message.trim().slice(0, 250) : "";
  if (!/^[\p{L}\p{M}0-9 .'-]{1,80}$/u.test(name) || !message || !["nha-trai", "nha-gai"].includes(input.side) || !["live", "yes", "no"].includes(input.status)) throw new Error("Vui lòng nhập tên, chọn phía và nội dung hợp lệ.");
  const guests = input.status === "yes" ? Math.min(20, Math.max(1, Math.floor(Number(input.guests) || 1))) : 0;
  const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const saved = await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${name.toLowerCase()}))`);
    const prior = await tx.select().from(weddingWishes).where(sql`lower(${weddingWishes.name}) = lower(${name})`);
    if (prior.length >= 3) throw new Error("Tên này đã gửi đủ 3 lần.");
    if (prior.some((row) => normalize(row.message) === normalize(message))) throw new Error("Bạn đã gửi nội dung này rồi.");
    const [row] = await tx.insert(weddingWishes).values({ name, side: input.side, status: input.status, guests, message }).returning();
    return row;
  });
  await notifyTelegram({ ...saved, type: saved.status === "live" ? "wish" : "rsvp" });
  return saved;
}

async function notifyTelegram(input: WishInput & { type: string }) {
  const token = process.env.TELEGRAM_BOT_TOKEN, chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  if (!input || !["wish", "rsvp"].includes(input.type) || !["nha-trai", "nha-gai"].includes(input.side)) return;
  const attendance = input.type === "rsvp" ? `\nTrạng thái: ${input.status === "yes" ? `Sẽ tham dự (${input.guests} khách)` : "Không tham dự"}` : "";
  const text = `💌 ${input.type === "wish" ? "LỜI CHÚC MỚI" : "XÁC NHẬN THAM DỰ"}\nTên: ${String(input.name).slice(0,80)}\nKhách: ${input.side === "nha-trai" ? "Nhà trai" : "Nhà gái"}${attendance}\nLời nhắn: ${String(input.message).slice(0,250)}`;
  try { await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text }), signal: AbortSignal.timeout(5000) }); } catch { /* Không ảnh hưởng việc lưu lời chúc. */ }
}
