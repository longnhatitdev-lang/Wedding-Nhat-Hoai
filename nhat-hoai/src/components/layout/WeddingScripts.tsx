"use client";

import { useEffect } from "react";
import { addWish, getWishes } from "@/action/wedding";
import { getPublicWeddingSettings } from "@/action/admin";

export function WeddingScripts() {
  useEffect(() => {
    Object.assign(window, { weddingActions: { addWish, getWishes } });
    let script = document.querySelector<HTMLScriptElement>('script[data-wedding-script]');
    if (!script) {
      script = document.createElement("script");
      script.src = "/demo/wedding.js";
      script.dataset.weddingScript = "true";
      document.body.appendChild(script);
    }
    let active = true;
    void getPublicWeddingSettings().then(({ trai, gai }) => {
      if (!active) return;
      const config = document.getElementById("lcln-sides");
      if (config) config.textContent = JSON.stringify({ trai, gai });
      const apply = () => {
        const page = window as typeof window & { lclnApplySide?: (side: string) => void };
        page.lclnApplySide?.(location.pathname === "/nha-gai" ? "gai" : "trai");
      };
      if ((window as typeof window & { lclnApplySide?: unknown }).lclnApplySide) apply();
      else script?.addEventListener("load", apply, { once: true });
    }).catch(() => { /* Giữ nội dung mặc định khi không tải được dữ liệu. */ });
    return () => { active = false; };
  }, []);
  return null;
}
