import { getSideSettings, type Side } from "@/lib/admin/settings";
import { requireAdmin } from "@/lib/admin/session";
import { SideForm } from "./SideForm";
import styles from "../admin.module.css";
export async function SideEditor({ side }: { side: Side }) { await requireAdmin(); const initial = await getSideSettings(side); const label = side === "trai" ? "Nhà trai" : "Nhà gái"; return <><div className={styles.eyebrow}>Quản lý thiệp</div><h1 className={styles.heading}>{label}</h1><p className={styles.sub}>Điều chỉnh thông tin tổ chức hiển thị trên thiệp {label.toLowerCase()}.</p><div className={styles.panel}><SideForm side={side} initial={initial} /></div></>; }
