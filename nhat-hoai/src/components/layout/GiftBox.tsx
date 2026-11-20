/* eslint-disable @next/next/no-img-element */
export function GiftBox() {
  return (
<section className="section_eight">
  <div className="container_content-bg">
    <img decoding="async" loading="lazy" src="/asset/img_backgroud/dragon2.webp" alt="" className="bg_right float-swing" />
    <img decoding="async" loading="lazy" src="/asset/img_backgroud/phoenix2.webp" alt="" className="bg_left float-swing" />
  </div>
  <h3 className="title-big"><span>Hộp quà mừng</span></h3>
  <div className="gift-sec">
    <div className="envelopes" id="giftBox">
      <div className="env e1" />
      <div className="env e2" />
    </div>
    <div className="hint" id="hintId">Nhấn để mở</div>
  </div>
  <div id="qrModal">
    <div className="modal">
      <div className="modal_hed">
        <h5>Gửi Quà Mừng</h5>
        <button>×</button>
      </div>
      <div className="qr-grid">
        <div className="qr-card" data-gift="groom">
          <img decoding="async" loading="lazy" id="qr1" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MB-RE" />
          <div>
            <b data-gift-role>Chú rể</b><br />
            <span data-gift-owner>Le Chu Long Nhat</span><br />
            <span id="stk1" data-gift-acc>0123456789</span><br />
            <span id="bank1" data-gift-bank>Tp Bank</span>
          </div>
          <button>Copy STK</button><button className="primary">
            Tải Mã QR
          </button>
        </div>
        <div className="qr-card" data-gift="bride">
          <img decoding="async" loading="lazy" id="qr2" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=VCB-DAU" />
          <div>
            <b data-gift-role>Cô dâu</b><br />
            <span data-gift-owner>Nguyen Thi Hoai</span><br />
            <span id="stk2" data-gift-acc>9876543210</span><br />
            <span id="bank2" data-gift-bank>Tp Bank</span>
          </div>
          <button>Copy STK</button><button className="primary">
            Tải Mã QR
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
