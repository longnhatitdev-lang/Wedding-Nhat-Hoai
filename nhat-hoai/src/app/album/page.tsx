/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { AlbumGallery } from "./_components/AlbumGallery";
import "./_components/AlbumGallery.css";

export const metadata: Metadata = { title: "Album ảnh cưới | Nhật & Hoài" };
export default function AlbumPage() {
  return <>
    <header className="top"><a className="back" href="/" aria-label="Về trang chủ">←</a><div className="brand">LCLN <span>WEDDING ARCHIVE</span></div><a className="home" href="/">Trang chủ</a></header>
    <main className="wrap"><div className="eyebrow">OUR MEMORIES</div><h1>Album ảnh cưới</h1><p className="intro">Những khoảnh khắc đẹp được lưu giữ theo thời gian.</p><AlbumGallery /></main>
  </>;
}
