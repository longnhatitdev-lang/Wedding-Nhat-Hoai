/* eslint-disable @next/next/no-img-element */
export function LoveStory() {
  return (
<section className="section_nine">
  <div className="lcln-ls-section" id="lcln-ls-love">
    <div className="lcln-ls-head"><h2 className="lcln-ls-title">Chuyện tình yêu</h2></div>
    <div className="lcln-ls-stage" id="lcln-ls-stage">
      <div className="lcln-ls-orbit" aria-hidden="true" />
      <div className="lcln-ls-glow" aria-hidden="true" />
      <div id="lcln-ls-slides" />
    </div>
    <div className="lcln-ls-controls">
      <button className="lcln-ls-nav" id="lcln-ls-prev" type="button" aria-label="Ảnh trước"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg></button>
      <div className="lcln-ls-progress" id="lcln-ls-progress" />
      <button className="lcln-ls-nav" id="lcln-ls-next" type="button" aria-label="Ảnh sau"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
    </div>
    <p className="lcln-ls-thanks"><strong>Cảm ơn quý khách đã xem thư mời 💌</strong>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</p>
  </div>
  <div className="lcln-ls-viewer" id="lcln-ls-viewer" role="dialog" aria-modal="true" aria-hidden="true">
    <button className="lcln-ls-close" id="lcln-ls-close" type="button" aria-label="Đóng"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" /></svg></button>
    <div className="lcln-ls-v-head">
      <span className="lcln-ls-chip" id="lcln-ls-v-chip" />
      <h3 className="lcln-ls-v-title" id="lcln-ls-v-title" />
      <p className="lcln-ls-v-text" id="lcln-ls-v-text" />
    </div>
    <div className="lcln-ls-v-body" id="lcln-ls-v-body"><img loading="lazy" className="lcln-ls-v-img" id="lcln-ls-v-img" alt="" decoding="async" /></div>
    <div className="lcln-ls-v-bar">
      <button className="lcln-ls-nav" id="lcln-ls-v-prev" type="button" aria-label="Ảnh trước"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg></button>
      <span className="lcln-ls-v-count" id="lcln-ls-v-count" />
      <button className="lcln-ls-nav" id="lcln-ls-v-next" type="button" aria-label="Ảnh sau"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
    </div>
  </div>
</section>

  );
}
