/* eslint-disable @next/next/no-img-element */
export function PhotoGallery() {
  return (
<section className="section_seven">
  <h2 className="title-big title_abum"><span>Album ảnh cưới</span></h2>
  <div className="wedding" id="weddingSlider">
    <button id="prev" className="nav-btn prev-btn" aria-label="Previous">
      ❮
    </button>
    <div id="stage" className="stage">
      <div className="slide left left-2" data-index={0}>
        <img decoding="async" loading="lazy" src="/asset/img/mau1.webp" alt="Slider 1" />
      </div>
      <div className="slide left left-1" data-index={1}>
        <img decoding="async" loading="lazy" src="/asset/img/mau13.webp" alt="Slider 2" />
      </div>
      <div className="slide active" data-index={2}>
        <img decoding="async" loading="lazy" src="/asset/img/mau2.webp" alt="Slider 3" />
      </div>
      <div className="slide right right-1" data-index={3}>
        <img decoding="async" loading="lazy" src="/asset/img/mau13.webp" alt="Slider 4" />
      </div>
      <div className="slide right right-2" data-index={4}>
        <img decoding="async" loading="lazy" src="/asset/img/mau1.webp" alt="Slider 5" />
      </div>
      <div className="slide right right-3" data-index={5}>
        <img decoding="async" loading="lazy" src="/asset/img/mau2.webp" alt="Slider 6" />
      </div>
      <div className="slide left left-3" data-index={6}>
        <img decoding="async" loading="lazy" src="/asset/img/mau13.webp" alt="Slider 7" />
      </div>
    </div>
    <button id="next" className="nav-btn next-btn" aria-label="Next">
      ❯
    </button>
    <div id="sliderDots" className="slider-dots" />
  </div>
  <div className="lightbox-modal" id="imageViewerModal">
    <span className="lightbox-modal__close-btn js-lightbox-close" title="Đóng">×</span>
    <div className="lightbox-modal__container">
      <button className="lightbox-nav lightbox-prev js-lightbox-prev">
        ❮
      </button>
      <img decoding="async" loading="lazy"  alt="Ảnh phóng to" className="lightbox-modal__content js-lightbox-display-img" />
      <button className="lightbox-nav lightbox-next js-lightbox-next">
        ❯
      </button>
    </div>
    
    <div className="lightbox-counter js-lightbox-counter">1 / 1</div>
  </div>
  <div className="lcln-album-link-wrap" style={{textAlign: 'center', margin: '28px auto 8px', padding: '0 16px'}}>
    <a href="/album" className="lcln-album-link" style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', border: '1px solid #c9a66b', borderRadius: 3, color: '#c9a66b', textDecoration: 'none', fontSize: 12, letterSpacing: '.08em', background: 'rgba(40,8,14,.35)'}}>✧ XEM ALBUM <span aria-hidden="true">→</span></a>
  </div>
</section>

  );
}
