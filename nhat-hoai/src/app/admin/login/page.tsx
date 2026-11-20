/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import styles from "../admin.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const router = useRouter();
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    try { const result = await authClient.signIn.username({ username, password }); if (result.error) { setError("Tên đăng nhập hoặc mật khẩu không đúng."); return; } router.replace("/admin"); router.refresh(); }
    catch { setError("Không thể đăng nhập. Vui lòng thử lại."); } finally { setBusy(false); }
  }
  return <main className={styles.loginPage}><div className={styles.loginBox}><div className={styles.brand}>NHẬT & HOÀI<small>WEDDING ADMIN</small></div><h1 className={styles.heading}>Chào mừng trở lại</h1><p className={styles.sub}>Đăng nhập để quản lý thiệp cưới của bạn.</p><form className={styles.form} onSubmit={login}><label className={styles.field}>Tên đăng nhập<input autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required /></label><label className={styles.field}>Mật khẩu<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{error && <div role="alert" className={styles.error}>{error}</div>}<button className={styles.button} disabled={busy}>{busy ? "Đang đăng nhập…" : "Đăng nhập"}</button></form><a className={styles.loginBack} href="/">Về thiệp cưới</a></div></main>;
}
