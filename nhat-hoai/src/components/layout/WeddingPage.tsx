/* eslint-disable @next/next/no-html-link-for-pages */
import { Intro } from "./Intro";
import { PreviewControls } from "./PreviewControls";
import type { Side, SideSettings } from "@/lib/admin/settings";
import { AudioControl } from "./AudioControl";
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

export function WeddingPage({ preview }: { preview?: { side: Side; settings: SideSettings } } = {}) {
  return <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <div id="lcln-page-loader" className="lcln-page-loader" aria-live="polite" aria-label="Đang tải thiệp" hidden><div className="lcln-loader-track"><span /></div><div className="lcln-loader-chip"><span className="lcln-loader-spinner" aria-hidden="true" /><span className="lcln-loader-label">Đang chuẩn bị thiệp cưới…</span></div></div>
    <script type="application/json" id="lcln-sides" dangerouslySetInnerHTML={{ __html: JSON.stringify(preview ? { ...sides, [preview.side]: preview.settings } : sides).replace(/</g, "\\u003c") }} />
    <nav id="lcln-side-nav" className="lcln-sidenav" aria-label="Chọn nhà"><a href="/" data-side="trai">🤵 Nhà trai</a><a href="/nha-gai" data-side="gai">👰 Nhà gái</a></nav>
    <main>
      {!preview && <header className="header"><AudioControl /></header>}
      {!preview && <Intro />}<Opening /><Invitation /><Families /><WeddingDetails date={preview?.settings.date} /><Venue /><WeddingWall /><PhotoGallery /><GiftBox /><LoveStory />
      <footer className="footer"><span className="copy-right">© Designed by LCLN 2026</span></footer>
    </main>
    <canvas id="rainCanvas" width="1231" height="647" />
    <script type="application/json" id="lcln-story-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(story).replace(/</g, "\\u003c") }} />
    <WeddingScripts previewSide={preview?.side} />
    <WeddingInteractions />
    {preview && <PreviewControls side={preview.side} initial={preview.settings} />}
  </>;
}
