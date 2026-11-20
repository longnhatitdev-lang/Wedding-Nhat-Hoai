/* eslint-disable @next/next/no-img-element */
export function WeddingWall() {
  return (
<section className="section_six">
  <div className="lcln-card" id="lcln-timeline">
    <h2 className="lcln-title">Lịch Trình Ngày Cưới</h2>
    <div className="lcln-timeline">
      
      <div className="lcln-item">
        <div className="lcln-left">
          <div className="lcln-icon">
            <i className="fa-solid fa-users" />
          </div>
          <div className="lcln-time">17:00</div>
        </div>
        <div className="lcln-dot" />
        <div className="lcln-right">
          <div className="lcln-event">Đón khách</div>
        </div>
      </div>
      
      <div className="lcln-item">
        <div className="lcln-left">
          <div className="lcln-icon">
            <i className="fa-solid fa-camera" />
          </div>
          <div className="lcln-time">18:00</div>
        </div>
        <div className="lcln-dot" />
        <div className="lcln-right">
          <div className="lcln-event">Khai tiệc</div>
        </div>
      </div>
      
      <div className="lcln-item">
        <div className="lcln-left">
          <div className="lcln-icon">
            <i className="fa-solid fa-cake-candles" />
          </div>
          <div className="lcln-time">18:30</div>
        </div>
        <div className="lcln-dot" />
        <div className="lcln-right">
          <div className="lcln-event">Nghi thức cưới</div>
        </div>
      </div>
      
      <div className="lcln-item">
        <div className="lcln-left">
          <div className="lcln-icon">
            <i className="fa-solid fa-wine-glass" />
          </div>
          <div className="lcln-time">19:00</div>
        </div>
        <div className="lcln-dot" />
        <div className="lcln-right">
          <div className="lcln-event">Cắt bánh &amp; nâng ly</div>
        </div>
      </div>
      
      <div className="lcln-item">
        <div className="lcln-left">
          <div className="lcln-icon">
            <i className="fa-solid fa-heart" />
          </div>
          <div className="lcln-time">20:30</div>
        </div>
        <div className="lcln-dot" />
        <div className="lcln-right">
          <div className="lcln-event">Kết thúc tiệc</div>
        </div>
      </div>
    </div>
  </div>
  <button id="js-open-rsvp" className="wedding-btn--rsvp">
    XÁC NHẬN THAM DỰ
  </button>
  <p className="rsvp-text">
    Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.
    <br />Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất
  </p>
  <div className="wedding-wall">
    <div id="js-wall-list" className="wall-list" />
  </div>
  <div id="js-toast" className="wedding-toast" />
  <div className="wedding-comment-bar">
    <input id="js-comment-input" className="wedding-input--comment" placeholder="Nhập lời chúc..." style={{opacity: 1}} />
    <button id="js-send-live" className="wedding-btn--send">➤</button>
  </div>
  <div id="js-modal-profile" className="wedding-modal is-hidden">
    <div className="wedding-modal__box">
      <button id="js-close-profile" className="wedding-btn--close">x</button>
      <h3>Bạn là ai nè?</h3>
      <div className="wedding-form__group">
        <label>Tên</label><input id="js-profile-name" className="wedding-form__input" placeholder="Nhập tên" />
        <p id="js-profile-name-error" className="wedding-form__error">
          Nhập tên đi 🥺
        </p>
      </div>
      <div className="wedding-form__group">
        <label>Khách của ai?</label>
        <div className="wedding-choice-group">
          <button id="js-profile-groom" className="wedding-choice-btn">
            🤵 Nhà trai</button><button id="js-profile-bride" className="wedding-choice-btn">
            👰 Nhà gái
          </button>
        </div>
        <p id="js-profile-side-error" className="wedding-form__error">
          Chọn phe nhé!
        </p>
      </div>
      <button id="js-save-profile" className="wedding-btn--submit">
        Xong, vào chúc thôi
      </button>
    </div>
  </div>
  <div id="js-modal-rsvp" className="wedding-modal is-hidden">
    <div className="wedding-modal__box">
      <button id="js-close-rsvp" className="wedding-btn--close">x</button>
      <div id="js-rsvp-content">
        <h2>Xác nhận tham dự</h2>
        <p style={{marginBottom: 16}}>
          Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.
          Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất
        </p>
        <div className="wedding-form__group">
          <label>Nhập tên</label><input id="js-rsvp-name" placeholder="Nhập tên của bạn" className="wedding-form__input" />
          <p id="js-rsvp-name-error" className="wedding-form__error">
            Nhập tên đi......
          </p>
        </div>
        <div className="wedding-form__group">
          <label>Khách của ai?</label>
          <div className="wedding-choice-group">
            <button id="js-rsvp-groom" className="wedding-choice-btn">
              🤵 Nhà trai</button><button id="js-rsvp-bride" className="wedding-choice-btn">
              👰 Nhà gái
            </button>
          </div>
          <p id="js-rsvp-side-error" className="wedding-form__error">
            Chọn phe nha!
          </p>
        </div>
        <div className="wedding-form__group">
          <label>Bạn sẽ đến chứ?</label><button id="js-opt-yes" className="wedding-option-btn wedding-option-btn--yes">
            ✓ Tôi sẽ đến</button><button id="js-opt-no" className="wedding-option-btn wedding-option-btn--no">
            ✕ Không đến được
          </button>
          <p id="js-rsvp-status-error" className="wedding-form__error">
            Chọn giúp mình nhé!
          </p>
        </div>
        <div id="js-group-qty" className="wedding-form__group is-hidden">
          <label className="label-soluong">Số lượng:
            <button type="button" id="js-qty-minus">-</button>
            <span id="js-qty-count">1</span>
            <button type="button" id="js-qty-plus">+</button></label>
        </div>
        <div className="wedding-form__group">
          <label>Lời nhắn</label><textarea placeholder="Nhập lời chúc tới cô dâu, chú rể (sẽ được hiển thị ở danh sách lời chúc)" id="js-rsvp-msg" className="wedding-form__input" rows={3} defaultValue={""} />
        </div>
        <button id="js-submit-rsvp" className="wedding-btn--submit">
          Gửi xác nhận
        </button>
      </div>
      <div id="js-rsvp-success" className="is-hidden" style={{textAlign: 'center'}}>
        <h3>✅ Đã gửi!</h3>
        <button id="js-done-rsvp" className="wedding-btn--submit">
          Đóng
        </button>
      </div>
    </div>
  </div>
  <button id="toggleWallBtn">👀 Hiện lời chúc</button>
  <div className="wedding-widget-wrapper" id="js-wedding-widget">
    
    <button className="widget-main-btn" id="js-widget-toggle" data-widget-item="main" title="Menu">
      <i className="fa-solid fa-heart" data-icon />
    </button>
    
    <button type="button" className="radial-item item-contact-main" id="js-btn-contact-main" data-widget-item="contact-main" title="Liên hệ">
      <i className="fa-solid fa-address-book" data-icon />
      <span className="tooltip">Liên hệ</span>
    </button>
    <button type="button" className="radial-item item-share-main" id="js-btn-share-main" data-widget-item="share-main" title="Chia sẻ">
      <i className="fa-solid fa-share-nodes" data-icon />
      <span className="tooltip">Chia sẻ</span>
    </button>
    
    <a href="tel:0900000000" className="sub-item phone-groom" data-widget-item="phone-groom" data-link={1} title="Gọi chú rể">
      <i className="fa-solid fa-phone" data-icon />
      <span className="tooltip">Gọi chú rể</span>
    </a>
    <a href="https://m.me/your_profile" target="_blank" className="sub-item msg-groom" data-widget-item="msg-groom" data-link={1} title="Nhắn tin chú rể">
      <i className="fa-brands fa-facebook-messenger" data-icon />
      <span className="tooltip">Nhắn chú rể</span>
    </a>
    
    <button type="button" className="sub-item copy-link" id="js-copy-link" data-widget-item="copy-link" title="Sao chép link">
      <i className="fa-regular fa-copy" data-icon />
      <span className="tooltip">Sao chép link</span>
    </button>
    <a href="https://www.facebook.com/sharer/sharer.php" target="_blank" className="sub-item facebook" data-widget-item="facebook" data-link={1} title="Facebook">
      <i className="fa-brands fa-facebook-f" data-icon />
      <span className="tooltip">Share Facebook</span>
    </a>
    <a href="fb-messenger://share" className="sub-item messenger" data-widget-item="messenger" data-link={1} title="Messenger">
      <i className="fa-brands fa-facebook-messenger" data-icon />
      <span className="tooltip">Share Messenger</span>
    </a>
  </div>
</section>

  );
}
