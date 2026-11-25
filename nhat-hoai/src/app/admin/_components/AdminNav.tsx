"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

const links = [["/admin", "Tổng quan"], ["/admin/nha-trai", "Nhà trai"], ["/admin/nha-gai", "Nhà gái"], ["/admin/album", "Album ảnh"]];
export function AdminNav() { const path = usePathname(); return <nav className="flex gap-1 overflow-x-auto md:grid md:gap-[5px] [&_a]:whitespace-nowrap [&_a]:rounded-lg [&_a]:px-2.5 [&_a]:py-2.5 [&_a]:text-xs [&_a]:font-semibold [&_a]:text-[#dccbd0] [&_a]:no-underline [&_a:hover]:bg-white/10 [&_a:hover]:text-white [&_a[data-active=true]]:bg-white/10 [&_a[data-active=true]]:text-white md:[&_a]:px-[14px] md:[&_a]:py-[13px] md:[&_a]:text-[15px]" aria-label="Quản trị">{links.map(([href, label]) => <Link href={href} key={href} data-active={path === href}>{label}</Link>)}</nav>; }
export function Logout() { const router = useRouter(); return <button className="cursor-pointer rounded-lg border-0 bg-[#f4ebe6] px-[18px] py-3 text-[13px] font-bold text-[#6c2936] disabled:cursor-not-allowed disabled:opacity-60" onClick={async () => { await authClient.signOut(); router.replace("/admin/login"); router.refresh(); }}>Đăng xuất</button>; }
