/* eslint-disable @next/next/no-img-element */
import { WeddingCalendar } from "./WeddingCalendar";
import { sides } from "./wedding-data";

export function WeddingDetails({ date = sides.trai.date }: { date?: string }) {
  return (
<section className="section_four">
  <div className="container_content-bg">
    <img decoding="async" loading="lazy" src="/asset/img_backgroud/dragon2.webp" alt="" className="bg_right float-swing" />
    <img decoding="async" loading="lazy" src="/asset/img_backgroud/phoenix2.webp" alt="" className="bg_left float-swing" />
  </div>
  <h2 className="title-big"><span>Thông tin tiệc cưới</span></h2>
  <div className="content_time-date">
    <div className="date-top">
      <p>
        LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI <br />
        TƯ GIA
      </p>
      <div className="thu-gio">
        <span>thứ hai</span>
        <span>10 giờ 00</span>
      </div>
      <div className="ngay">
        <span>28</span>
        <div className="thang">
          <span>Tháng 12</span>
          <span>2026</span>
        </div>
      </div>
      <p>( Tức là ngày 12 tháng 12 Âm lịch)</p>
    </div>
  </div>
  
  <div className="countdown-card" data-wedding-date="2026-12-28T08:00">
    <h3 className="countdown-title">Đếm Ngược Ngày Trọng Đại</h3>
    <div className="countdown-timer">
      <div className="time-box">
        <span id="days">84</span>
        <span className="time-label">Ngày</span>
      </div>
      <div className="time-box">
        <span id="hours">22</span>
        <span className="time-label">Giờ</span>
      </div>
      <div className="time-box">
        <span id="minutes">41</span>
        <span className="time-label">Phút</span>
      </div>
      <div className="time-box">
        <span id="seconds">26</span>
        <span className="time-label">Giây</span>
      </div>
    </div>
  </div>
  <WeddingCalendar key={date} date={date} />
</section>

  );
}
