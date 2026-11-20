import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin/session";
import { AdminNav, Logout } from "../_components/AdminNav";
import styles from "../admin.module.css";

async function Protected({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return <div className={styles.shell}><aside className={styles.sidebar}><div className={styles.brand}>NHẬT & HOÀI<small>WEDDING ADMIN</small></div><AdminNav /><div className={styles.sideFoot}>Một nơi để chăm chút<br />cho ngày đặc biệt.</div></aside><div className={styles.main}><header className={styles.top}><div className={styles.topLabel}>Không gian quản trị</div><div className={styles.topActions}><span>{session.user.name}</span><a href="/" target="_blank">Xem thiệp</a><Logout /></div></header><div className={styles.content}>{children}</div></div></div>;
}
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <Suspense fallback={<div>Đang kiểm tra đăng nhập…</div>}><Protected>{children}</Protected></Suspense>; }
