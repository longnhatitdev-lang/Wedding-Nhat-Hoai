"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getPublicWeddingSettings } from "@/action/admin";
const defaultAlbum = ["/asset/img/aaa.PNG", "/asset/img/mau1.webp", "/asset/img/mau13.webp", "/asset/img/mau2.webp"].map((url) => ({ url, caption: "" }));

export function AlbumGallery() {
  const [album, setAlbum] = useState(defaultAlbum);
  const images = album.map((image) => image.url);
  useEffect(() => { let active = true; void getPublicWeddingSettings().then((data) => { if (active) setAlbum(data.album); }).catch(() => {}); return () => { active = false; }; }, []);
  const [index, setIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [direction, setDirection] = useState(1);
  const touch = useRef({ x: 0, y: 0 });
  const move = useCallback((step: number) => { setDirection(step); setIndex((current) => current === null || images.length === 0 ? null : (current + step + images.length) % images.length); }, [images.length]);
  useEffect(() => { if (!playing || index === null) return; const timer = window.setInterval(() => move(direction), 3600); return () => clearInterval(timer); }, [playing, index, direction, move]);
  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setIndex(null); setPlaying(false); } else if (event.key === "ArrowRight") move(1); else if (event.key === "ArrowLeft") move(-1); };
    const onVisibility = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("keydown", onKey); document.addEventListener("visibilitychange", onVisibility);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); document.removeEventListener("visibilitychange", onVisibility); };
  }, [index, move]);
  return <>
    <div className="rule"><span /><b>{images.length} TÁC PHẨM</b><span /></div>
    <section className="gallery" aria-label="Thư viện ảnh">{album.map(({ url, caption }, i) => <button className="tile" type="button" key={`${url}-${i}`} onClick={() => { setPlaying(false); setIndex(i); }} aria-label={`Mở ảnh ${i + 1}`}><img loading="lazy" decoding="async" src={url} alt={caption || `Khoảnh khắc cưới ${i + 1}`} /></button>)}</section>
    {images.length === 0 && <p className="empty">Chưa có ảnh trong album.</p>}
    {index !== null && <div className="viewer open" role="dialog" aria-modal="true" aria-label="Xem ảnh cưới" onClick={(event) => { if (event.target === event.currentTarget) { setIndex(null); setPlaying(false); } }} onTouchStart={(event) => { touch.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; setPlaying(false); }} onTouchEnd={(event) => { const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); }}>
      <button className="close" aria-label="Đóng" onClick={() => { setIndex(null); setPlaying(false); }}>×</button><div className="viewer-head"><span>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><span className="viewer-hint">Vuốt để chuyển ảnh</span></div>
      <button className="arrow prev" aria-label="Ảnh trước" onClick={() => move(-1)}>‹</button><img src={images[index]} alt={`Ảnh cưới ${index + 1}`} /><button className="arrow next" aria-label="Ảnh tiếp theo" onClick={() => move(1)}>›</button><div className="viewer-tools"><button className={`auto${playing ? " on" : ""}`} onClick={() => setPlaying(!playing)}>{playing ? "Ⅱ Tự động: Bật" : "▶ Tự động: Tắt"}</button><span>Hướng: {direction > 0 ? "Sang phải" : "Sang trái"}</span></div>
    </div>}
  </>;
}
