"use client";

import { useEffect, useRef, useState } from "react";
import { saveSide, uploadAlbumImage } from "@/action/admin";
import type { Side, SideSettings } from "@/lib/admin/settings";
import { renderWeddingDate } from "./wedding-calendar";
import { applyGiftSettings, defaultGiftSettings, type GiftRecipient } from "./gift-settings";
import { editableTextSelectors, type WeddingTextKey, type WeddingTexts } from "./editable-text";

type SideWindow = Window & { lclnApplySide?: (side: Side) => void };

export function PreviewControls({ side, initial }: { side: Side; initial: SideSettings }) {
  const [settings, setSettings] = useState<SideSettings>({ ...initial, gifts: initial.gifts ?? defaultGiftSettings });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const edits = useRef<WeddingTexts>({ ...initial.texts });
  const address = useRef(initial.address);
  const lunar = useRef(initial.lunar);

  useEffect(() => {
    document.body.classList.add("wedding-preview");
    const marked: HTMLElement[] = [];
    const frame = requestAnimationFrame(() => {
      (window as SideWindow).lclnApplySide?.(side);
      const targets: Array<[string, string]> = [...Object.entries(editableTextSelectors), ["address", ".section_five .address"], ["lunar", ".date-top > p:last-child"]];
      for (const [key, selector] of targets) {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) continue;
        element.contentEditable = "plaintext-only";
        element.dataset.editKey = key;
        element.dataset.placeholder = key === "lunar" ? "Nhấn để thêm ngày âm lịch" : "Nhấn để nhập nội dung";
        element.setAttribute("role", "textbox");
        element.setAttribute("aria-label", key === "address" ? "Địa chỉ tổ chức" : key === "lunar" ? "Ngày âm lịch" : "Nội dung thiệp");
        element.setAttribute("spellcheck", "false");
        marked.push(element);
      }
    });
    const onInput = (event: Event) => {
      const element = event.target as HTMLElement;
      const key = element.dataset.editKey;
      if (!key) return;
      const value = element.innerText;
      if (key === "address") address.current = value.replace(/^\s*📍\s*/, "").trim();
      else if (key === "lunar") lunar.current = value.trim();
      else edits.current[key as WeddingTextKey] = value;
      setMessage("");
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element).closest("[data-edit-key]")) event.stopPropagation();
    };
    document.addEventListener("input", onInput);
    document.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("wedding-preview");
      document.removeEventListener("input", onInput);
      document.removeEventListener("click", onClick, true);
      marked.forEach((element) => { element.removeAttribute("contenteditable"); delete element.dataset.editKey; });
    };
  }, [side]);

  useEffect(() => {
    renderWeddingDate(settings.date, settings.time);
  }, [settings.date, settings.time]);

  useEffect(() => {
    applyGiftSettings(settings.gifts);
  }, [settings.gifts]);

  function changeGift(role: "groom" | "bride", field: keyof GiftRecipient, value: string) {
    setSettings((current) => {
      const gifts = current.gifts ?? defaultGiftSettings;
      return { ...current, gifts: { ...gifts, [role]: { ...gifts[role], [field]: value } } };
    });
    setMessage("");
  }

  async function uploadQr(role: "groom" | "bride", event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    setMessage("");
    try {
      const result = await uploadAlbumImage(file);
      if (!result.url) { setMessage(result.error || "Không thể tải ảnh lên."); return; }
      changeGift(role, "qrUrl", result.url);
      setMessage("Đã tải mã QR. Nhấn Lưu thay đổi để áp dụng.");
    } catch {
      setMessage("Không tải được mã QR. Kiểm tra ảnh JPEG, PNG hoặc WebP tối đa 4 MB và cấu hình Cloudinary trên máy chủ.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    setBusy(true);
    setMessage("");
    try {
      const value = { ...settings, address: address.current, lunar: lunar.current, texts: edits.current };
      await saveSide(side, value);
      setSettings(value);
      setMessage("Đã lưu thay đổi. Tải lại thiệp để xem ngày, giờ và bản đồ mới.");
    } catch {
      setMessage("Không thể lưu. Kiểm tra ngày, giờ, địa chỉ, thông tin tài khoản và đường dẫn ảnh QR.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="preview-toolbar">
    <div className="preview-toolbar__row">
      <span>Nhấn vào chữ trên thiệp để sửa</span>
      <button type="button" onClick={save} disabled={busy}>{busy ? "Đang lưu…" : "Lưu thay đổi"}</button>
    </div>
    <details>
      <summary>Ngày, giờ và bản đồ</summary>
      <div className="preview-toolbar__fields">
        <label>Ngày tổ chức<input type="date" value={settings.date} onChange={(event) => setSettings({ ...settings, date: event.target.value })} /></label>
        <label>Giờ tổ chức<input type="time" value={settings.time} onChange={(event) => setSettings({ ...settings, time: event.target.value })} /></label>
        <label>Liên kết chỉ đường<input type="url" value={settings.map} onChange={(event) => setSettings({ ...settings, map: event.target.value })} /></label>
        <label>Liên kết bản đồ nhúng<input type="url" value={settings.embed} onChange={(event) => setSettings({ ...settings, embed: event.target.value })} /></label>
      </div>
    </details>
    <details>
      <summary>Mã QR và tài khoản mừng cưới</summary>
      {([ ["groom", "Chú rể"], ["bride", "Cô dâu"] ] as const).map(([role, label]) => {
        const gift = (settings.gifts ?? defaultGiftSettings)[role];
        return <fieldset className="preview-gift" key={role}>
          <legend>{label}</legend>
          <div className="preview-toolbar__fields">
            <label>Chủ tài khoản<input value={gift.owner} maxLength={2000} onChange={(event) => changeGift(role, "owner", event.target.value)} /></label>
            <label>Ngân hàng<input value={gift.bank} maxLength={2000} onChange={(event) => changeGift(role, "bank", event.target.value)} /></label>
            <label>Số tài khoản<input value={gift.account} maxLength={2000} onChange={(event) => changeGift(role, "account", event.target.value)} /></label>
            <label>Đường dẫn ảnh QR<input value={gift.qrUrl} maxLength={2000} onChange={(event) => changeGift(role, "qrUrl", event.target.value)} /></label>
            <label>Tải ảnh QR lên<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => void uploadQr(role, event)} /></label>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {gift.qrUrl && <img className="preview-gift__qr" src={gift.qrUrl} alt={`Mã QR ${label}`} />}
        </fieldset>;
      })}
    </details>
    {message && <p role="status">{message}</p>}
  </div>;
}
