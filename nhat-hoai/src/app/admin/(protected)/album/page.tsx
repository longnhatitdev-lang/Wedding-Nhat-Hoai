import { Suspense } from "react";
import { getAlbum } from "@/lib/admin/settings";
import { requireAdmin } from "@/lib/admin/session";
import { AlbumForm } from "../../_components/AlbumForm";
async function Editor() { await requireAdmin(); const images = await getAlbum(); return <><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9b7151]">Bộ sưu tập</div><h1 className="my-3 font-[Georgia,serif] text-[clamp(30px,4vw,46px)] font-normal text-[#341820]">Album ảnh</h1><p className="mt-0 mb-[30px] leading-[1.7] text-[#846c70]">Lưu giữ những khoảnh khắc đẹp. Thêm đường dẫn ảnh, sửa chú thích và sắp xếp thứ tự hiển thị.</p><AlbumForm initial={images} /></>; }
export default function AlbumAdminPage() { return <Suspense fallback={<p>Đang tải album…</p>}><Editor /></Suspense>; }
