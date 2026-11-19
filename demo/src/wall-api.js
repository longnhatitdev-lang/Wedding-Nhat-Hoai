const { SUPABASE_URL, SUPABASE_KEY } = require("./config");
const { isClientAllowed } = require("./access-control");
const { readBody, sendJson } = require("./http-utils");
const recent = new Map();
function limited(ip, limit = 12, bucket = "post") {
  const now = Date.now(), key = `${ip || "unknown"}:${bucket}`;
  const row = recent.get(key) || { start: now, count: 0 };
  if (now - row.start > 60_000) { row.start = now; row.count = 0; }
  row.count++; recent.set(key, row);
  if (recent.size > 4000) for (const [k, v] of recent) if (now - v.start > 120_000) recent.delete(k);
  return row.count > limit;
}
async function handleWallRequest(req, res) {
  if (!['GET', 'POST'].includes(req.method)) return sendJson(res, 405, { error: "Method Not Allowed" });
  try { const access = await isClientAllowed(req); if (!access.ok) return sendJson(res, 401, { error: "Cần đăng nhập để sử dụng chức năng này." }); } catch { return sendJson(res, 503, { error: "Không thể kiểm tra quyền truy cập." }); }
  if (!SUPABASE_URL || !SUPABASE_KEY) return sendJson(res, 503, { error: "Chưa cấu hình SUPABASE_URL và SUPABASE_KEY trong file .env." });
  const forwarded = process.env.TRUST_PROXY === "true" ? String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() : "";
  const ip = forwarded || String(req.socket.remoteAddress || "unknown");
  if (limited(ip, req.method === "POST" ? 12 : 90, req.method === "POST" ? "post" : "get")) return sendJson(res, 429, { error: "Bạn gửi hơi nhanh. Vui lòng thử lại sau một phút." });
  const base = SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/wedding_wall";
  const headers = { apikey: SUPABASE_KEY, "Content-Type": "application/json" };
  // Legacy JWT keys need Authorization; newer sb_publishable_/sb_secret_ keys are API-key credentials.
  if (SUPABASE_KEY.startsWith("eyJ")) headers.Authorization = `Bearer ${SUPABASE_KEY}`;
  try {
    if (req.method === "GET") {
      const upstream = await fetch(base + "?select=*&order=created_at.asc&limit=200", { headers, signal: AbortSignal.timeout(10000) });
      const body = await upstream.text();
      res.writeHead(upstream.status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      return res.end(body);
    }
    if (req.method !== "POST") return sendJson(res, 405, { error: "Method Not Allowed" });
    if (!String(req.headers["content-type"] || "").toLowerCase().includes("application/json")) return sendJson(res, 415, { error: "Content-Type phải là application/json." });
    let data; try { data = JSON.parse((await readBody(req, 8192)).toString()); } catch { return sendJson(res, 400, { error: "Dữ liệu không hợp lệ." }); }
    const name = typeof data.name === "string" ? data.name.trim().slice(0, 80) : "";
    const side = ["nha-trai", "nha-gai"].includes(data.side) ? data.side : "";
    const status = ["live", "yes", "no"].includes(data.status) ? data.status : "";
    const message = typeof data.message === "string" ? data.message.trim().slice(0, 250) : "";
    const guests = status === "yes" ? Math.min(20, Math.max(1, Number(data.guests) || 1)) : 0;
    if (!name || !/^[\p{L}\p{M}0-9 .'-]{1,80}$/u.test(name) || !side || !status || !message) return sendJson(res, 400, { error: "Vui lòng nhập tên, chọn phía và nội dung hợp lệ." });
    // Enforce duplicate and per-name limits server-side; client-side checks alone can be bypassed.
    const checkUrl = new URL(base);
    checkUrl.searchParams.set("select", "name,message");
    checkUrl.searchParams.set("name", `ilike.${name}`);
    checkUrl.searchParams.set("limit", "20");
    const checkResponse = await fetch(checkUrl, { headers, signal: AbortSignal.timeout(10000) });
    if (!checkResponse.ok) return sendJson(res, 502, { error: "Không thể kiểm tra giới hạn gửi. Vui lòng thử lại." });
    const prior = await checkResponse.json();
    if (Array.isArray(prior) && prior.length >= 3) return sendJson(res, 429, { error: `${name} đã gửi đủ 3 lần rồi ạ!` });
    const normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    if (Array.isArray(prior) && prior.some((row) => normalize(row.message) === normalize(message))) return sendJson(res, 409, { error: "Nội dung này bạn đã gửi rồi, hãy viết nội dung khác nhé!" });
    const upstream = await fetch(base, { method: "POST", headers: { ...headers, Prefer: "return=representation" }, body: JSON.stringify([{ name, side, status, guests, message }]), signal: AbortSignal.timeout(10000) });
    const body = await upstream.text();
    if (!upstream.ok) return sendJson(res, upstream.status >= 500 ? 502 : upstream.status, { error: "Không lưu được dữ liệu. Kiểm tra cấu hình Supabase và quyền bảng wedding_wall." });
    let rows = []; try { rows = JSON.parse(body); } catch {}
    return sendJson(res, 201, rows[0] || { name, side, status, guests, message });
  } catch { return sendJson(res, 502, { error: "Không kết nối được Supabase. Vui lòng thử lại." }); }
}
module.exports = { handleWallRequest };
