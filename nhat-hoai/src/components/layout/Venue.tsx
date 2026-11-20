/* eslint-disable @next/next/no-img-element */
export function Venue() {
  return (
<section className="section_five">
  <h2 className="title-big"><span>Tiệc tổ chứ tại</span></h2>
  <p className="address">
    📍 Sân bóng Nương Hoang (Nương Má) thôn 1, xã Phú Trạch, tỉnh Quảng
    Trị
  </p>
  <div className="content_map">
    <iframe className="map_iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7593.5716070378285!2d106.41424337288183!3d17.89546654086152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31389bb6b2402871%3A0xb6412903cbab35d4!2zU8OibiBCw7NuZyBOxrDGoW5nIEhvYW5nIChOxrDGoW5nIE3DoSk!5e0!3m2!1svi!2smy!4v1790078146355!5m2!1svi!2smy" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
  </div>
  <div className="wedding-btn-group">
    <a href="https://www.google.com/maps?cid=13132823084667712980&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=vi&gl=MY&source=embed" className="wedding-btn" target="_blank">
      <span className="icon">📍</span> Chỉ Đường
    </a>
  </div>
</section>

  );
}
