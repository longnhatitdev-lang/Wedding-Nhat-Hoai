"use client";

import { useEffect } from "react";
import { addWish, getWishes } from "@/action/wedding";
import { getPublicWeddingSettings } from "@/action/admin";

export function WeddingScripts({ previewSide }: { previewSide?: "trai" | "gai" }) {
  useEffect(() => {
    Object.assign(window, { weddingActions: { addWish, getWishes } });
    let active = true;
    if (previewSide) return () => { active = false; };
    void getPublicWeddingSettings().then(({ trai, gai }) => {
      if (!active) return;
      const config = document.getElementById("lcln-sides");
      if (config) config.textContent = JSON.stringify({ trai, gai });
      const apply = () => {
        const page = window as typeof window & { lclnApplySide?: (side: string) => void };
        page.lclnApplySide?.(location.pathname === "/nha-gai" ? "gai" : "trai");
      };
      if ((window as typeof window & { lclnApplySide?: unknown }).lclnApplySide) apply();
      else window.setTimeout(apply, 0);
    }).catch(() => { /* Giữ nội dung mặc định khi không tải được dữ liệu. */ });
    return () => { active = false; };
  }, [previewSide]);
  return null;
}
