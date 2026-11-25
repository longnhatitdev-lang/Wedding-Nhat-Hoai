import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin/session";
import { AdminNav, Logout } from "../_components/AdminNav";

async function Protected({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return <div className="min-h-screen bg-[#f7f3ef] font-[Arial,sans-serif] text-[15px] text-[#2c1820] md:grid md:grid-cols-[250px_minmax(0,1fr)]"><aside className="flex flex-col gap-[18px] bg-[#32121b] p-[18px] text-[#f9efea] md:gap-8 md:px-[22px] md:py-[34px]"><div className="font-[Georgia,serif] text-xl tracking-[0.12em] text-[#f5e4d5] md:text-2xl [&_small]:mt-2 [&_small]:block [&_small]:font-[Arial,sans-serif] [&_small]:text-[10px] [&_small]:tracking-[0.23em] [&_small]:text-[#cda985]">NHẬT & HOÀI<small>WEDDING ADMIN</small></div><AdminNav /><div className="mt-auto hidden text-xs leading-[1.7] text-[#c0a8aa] md:block">Một nơi để chăm chút<br />cho ngày đặc biệt.</div></aside><div className="min-w-0 px-[18px] pt-[25px] pb-[60px] md:px-[clamp(22px,5vw,72px)] md:pt-[38px] md:pb-[70px]"><header className="mb-7 flex flex-wrap items-center justify-between gap-4 md:mb-[42px]"><div className="text-xs uppercase tracking-[0.13em] text-[#846c70]">Không gian quản trị</div><div className="flex flex-wrap items-center gap-4 [&_a]:text-[13px] [&_a]:text-[#6c1d2e] [&_a]:no-underline"><span>{session.user.name}</span><a href="/" target="_blank">Xem thiệp</a><Logout /></div></header><div className="mx-auto max-w-[1050px]">{children}</div></div></div>;
}
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <Suspense fallback={<div>Đang kiểm tra đăng nhập…</div>}><Protected>{children}</Protected></Suspense>; }
