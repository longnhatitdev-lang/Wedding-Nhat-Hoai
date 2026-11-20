"use client";
import { useState } from "react";
import { saveSide } from "@/action/admin";
import type { Side, SideSettings } from "@/lib/admin/settings";
import styles from "../admin.module.css";

export function SideForm({ side, initial }: { side: Side; initial: SideSettings }) {
  const [form, setForm] = useState(initial); const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const change = (key: keyof SideSettings, value: string) => { setForm((current) => ({ ...current, [key]: value })); setMessage(""); };
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setMessage(""); setError(""); setBusy(true); try { await saveSide(side, form); setMessage("Đã lưu thay đổi. Khách sẽ thấy thông tin mới khi mở lại thiệp."); } catch { setError("Không thể lưu. Kiểm tra thông tin và thử lại."); } finally { setBusy(false); } }
  return <form className={styles.form} onSubmit={submit}><div className={styles.grid}><label className={styles.field}>Ngày tổ chức<input type="date" value={form.date} required onChange={(e) => change("date", e.target.value)} /></label><label className={styles.field}>Giờ tổ chức<input type="time" value={form.time} required onChange={(e) => change("time", e.target.value)} /></label></div><label className={styles.field}>Địa chỉ tổ chức<textarea value={form.address} required maxLength={2000} onChange={(e) => change("address", e.target.value)} /></label><label className={styles.field}>Liên kết Google Maps<input type="url" value={form.map} maxLength={2000} onChange={(e) => change("map", e.target.value)} /><span className={styles.hint}>Đường dẫn HTTPS mở bản đồ khi khách nhấn chỉ đường.</span></label><label className={styles.field}>Liên kết bản đồ nhúng<input type="url" value={form.embed} maxLength={2000} onChange={(e) => change("embed", e.target.value)} /><span className={styles.hint}>Có thể bỏ trống để tìm bản đồ theo địa chỉ.</span></label><label className={styles.field}>Ngày âm lịch<input value={form.lunar} maxLength={2000} onChange={(e) => change("lunar", e.target.value)} /></label><div><button className={styles.button} disabled={busy}>{busy ? "Đang lưu…" : "Lưu thay đổi"}</button></div>{message && <div role="status" className={styles.message}>{message}</div>}{error && <div role="alert" className={styles.error}>{error}</div>}</form>;
}
