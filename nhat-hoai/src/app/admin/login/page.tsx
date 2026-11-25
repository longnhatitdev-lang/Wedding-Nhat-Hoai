"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";

const inputClass = "box-border w-full rounded-lg border border-[#dfd0ca] bg-white px-[13px] py-3 text-[15px] font-normal text-[#2c1820] outline-offset-2 focus:outline-2 focus:outline-[#c89b7a]";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = await authClient.signIn.username({ username, password });
      if (result.error) {
        setError("Tên đăng nhập hoặc mật khẩu không đúng.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Không thể đăng nhập. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="box-border grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#683441,#2c1019_70%)] p-6 font-[Arial,sans-serif] text-[#2c1820]">
      <div className="box-border w-full max-w-[440px] rounded-2xl bg-[#fffaf7] px-6 py-[30px] shadow-[0_30px_90px_#11070a44] sm:p-10">
        <div className="font-[Georgia,serif] text-2xl tracking-[0.12em] text-[#74283b]">
          NHẬT &amp; HOÀI
          <small className="mt-2 block font-[Arial,sans-serif] text-[10px] tracking-[0.23em] text-[#a47e69]">WEDDING ADMIN</small>
        </div>
        <h1 className="mt-10 mb-3 font-[Georgia,serif] text-[34px] font-normal text-[#341820]">Chào mừng trở lại</h1>
        <p className="mt-0 mb-[30px] leading-[1.7] text-[#846c70]">Đăng nhập để quản lý thiệp cưới của bạn.</p>
        <form className="grid gap-5" onSubmit={login}>
          <label className="grid gap-2 text-[13px] font-bold text-[#51343b]">
            Tên đăng nhập
            <input className={inputClass} autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
          </label>
          <label className="grid gap-2 text-[13px] font-bold text-[#51343b]">
            Mật khẩu
            <input className={inputClass} type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {error && <div role="alert" className="text-[13px] text-[#a23334]">{error}</div>}
          <button className="w-full cursor-pointer rounded-lg border-0 bg-[#6c1d2e] px-[18px] py-3 text-[13px] font-bold text-white hover:bg-[#511323] disabled:cursor-wait disabled:opacity-60" disabled={busy}>
            {busy ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
        <Link className="mt-6 block text-center text-[13px] text-[#886e72] no-underline hover:underline" href="/">Về thiệp cưới</Link>
      </div>
    </main>
  );
}
