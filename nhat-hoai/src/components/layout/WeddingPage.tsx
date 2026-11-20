/* eslint-disable @next/next/no-html-link-for-pages */
import { Intro } from "./Intro";
import { Opening } from "./Opening";
import { Invitation } from "./Invitation";
import { Families } from "./Families";
import { WeddingDetails } from "./WeddingDetails";
import { Venue } from "./Venue";
import { WeddingWall } from "./WeddingWall";
import { PhotoGallery } from "./PhotoGallery";
import { GiftBox } from "./GiftBox";
import { LoveStory } from "./LoveStory";
import { WeddingScripts } from "./WeddingScripts";
import { WeddingInteractions } from "./WeddingInteractions";
import { sides, story } from "./wedding-data";
import "./WeddingPage.css";

export function WeddingPage() {
  return <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <div id="lcln-page-loader" className="lcln-page-loader" aria-live="polite" aria-label="Đang tải thiệp" hidden><div className="lcln-loader-track"><span /></div><div className="lcln-loader-chip"><span className="lcln-loader-spinner" aria-hidden="true" /><span className="lcln-loader-label">Đang chuẩn bị thiệp cưới…</span></div></div>
    <script type="application/json" id="lcln-sides" dangerouslySetInnerHTML={{ __html: JSON.stringify(sides).replace(/</g, "\\u003c") }} />
    <nav id="lcln-side-nav" className="lcln-sidenav" aria-label="Chọn nhà"><a href="/" data-side="trai">🤵 Nhà trai</a><a href="/nha-gai" data-side="gai">👰 Nhà gái</a></nav>
    <main>
      <header className="header"><div id="audio_play" data-music-icon="audio.png"><audio id="my_audio" loop preload="none" src="/asset/audio/le-duong.mp3" /><img id="audio_icon" src="/asset/icon/audio.png" alt="Nhạc nền" /></div></header>
      <Intro /><Opening /><Invitation /><Families /><WeddingDetails /><Venue /><WeddingWall /><PhotoGallery /><GiftBox /><LoveStory />
      <footer className="footer"><span className="copy-right">© Designed by LCLN 2026</span></footer>
    </main>
    <canvas id="rainCanvas" width="1231" height="647" />
    <script type="application/json" id="lcln-story-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(story).replace(/</g, "\\u003c") }} />
    <WeddingScripts />
    <WeddingInteractions />
  </>;
}
