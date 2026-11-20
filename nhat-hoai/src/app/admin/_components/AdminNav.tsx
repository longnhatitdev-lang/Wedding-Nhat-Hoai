"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import styles from "../admin.module.css";

const links = [["/admin", "Tổng quan"], ["/admin/nha-trai", "Nhà trai"], ["/admin/nha-gai", "Nhà gái"], ["/admin/album", "Album ảnh"]];
export function AdminNav() { const path = usePathname(); return <nav className={styles.nav} aria-label="Quản trị">{links.map(([href, label]) => <Link href={href} key={href} data-active={path === href}>{label}</Link>)}</nav>; }
export function Logout() { const router = useRouter(); return <button className={styles.secondary} onClick={async () => { await authClient.signOut(); router.replace("/admin/login"); router.refresh(); }}>Đăng xuất</button>; }
