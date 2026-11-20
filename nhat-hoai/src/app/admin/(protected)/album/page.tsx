import { Suspense } from "react";
import { getAlbum } from "@/lib/admin/settings";
import { requireAdmin } from "@/lib/admin/session";
import { AlbumForm } from "../../_components/AlbumForm";
import styles from "../../admin.module.css";
async function Editor() { await requireAdmin(); const images = await getAlbum(); return <><div className={styles.eyebrow}>Bộ sưu tập</div><h1 className={styles.heading}>Album ảnh</h1><p className={styles.sub}>Lưu giữ những khoảnh khắc đẹp. Thêm đường dẫn ảnh, sửa chú thích và sắp xếp thứ tự hiển thị.</p><AlbumForm initial={images} /></>; }
export default function AlbumAdminPage() { return <Suspense fallback={<p>Đang tải album…</p>}><Editor /></Suspense>; }
