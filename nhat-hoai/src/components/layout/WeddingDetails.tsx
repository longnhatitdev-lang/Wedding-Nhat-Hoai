/* eslint-disable @next/next/no-img-element */
export function WeddingDetails() {
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
  <div className="calendar-card" data-month="02" data-year={2027} data-wedding-day="01">
    
    <div className="calendar-header">
      <span className="month">Tháng 2</span>
      <span className="year">2027</span>
    </div>
    
    <div className="calendar-grid">
      <span className="day-name wedding-day">Thứ 2</span><span className="day-name">Thứ 3</span><span className="day-name">Thứ 4</span><span className="day-name">Thứ 5</span><span className="day-name">Thứ 6</span><span className="day-name">Thứ 7</span><span className="day-name">CN</span><span className="day-item wedding-day">1</span><span className="day-item">2</span><span className="day-item">3</span><span className="day-item">4</span><span className="day-item">5</span><span className="day-item">6</span><span className="day-item">7</span><span className="day-item">8</span><span className="day-item">9</span><span className="day-item">10</span><span className="day-item">11</span><span className="day-item">12</span><span className="day-item">13</span><span className="day-item">14</span><span className="day-item">15</span><span className="day-item">16</span><span className="day-item">17</span><span className="day-item">18</span><span className="day-item">19</span><span className="day-item">20</span><span className="day-item">21</span><span className="day-item">22</span><span className="day-item">23</span><span className="day-item">24</span><span className="day-item">25</span><span className="day-item">26</span><span className="day-item">27</span><span className="day-item">28</span>
    </div>
  </div>
</section>

  );
}
