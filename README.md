# LCLN Wedding — Nhà trai & Nhà gái

## Cấu trúc
- `client/index-nam.html`: giao diện Nhà trai.
- `client/index-gai.html`: giao diện Nhà gái.
- `client/style.css`, `client/javascript.js`: mã giao diện dùng chung.
- `admin/index.html`: trang quản trị chung có menu Nhà trai/Nhà gái.
- `admin/index-nam.html`, `admin/index-gai.html`: trang quản trị riêng từng bên, dùng chung bộ công cụ nhưng mở đúng nhà mặc định.
- `admin/admin.css`, `admin/admin.js`: mã quản trị.
- `public/asset/`, `public/uploads/`: tài nguyên ảnh/icon/nhạc.
- `src/`: máy chủ và API.

## Chạy
1. Cài Node.js 18+.
2. Sao chép `.env.example` thành `.env` và điền giá trị thật.
3. Chạy `npm start`.
4. Mở `/index-nam`, `/index-gai`, `/admin-nam`, `/admin-gai` hoặc `/admin`. Các đường dẫn `/nha-trai`, `/nha-gai`, `/admin.html` vẫn tương thích.

## Supabase và bảo mật
- Trình duyệt không khởi tạo Supabase trực tiếp; API `/api/wall` gọi Supabase từ máy chủ. Không có key Supabase trong `client/javascript.js` hoặc HTML.
- Điền `SUPABASE_URL` và `SUPABASE_KEY` trong `.env`. `.env` đã nằm trong `.gitignore`; chỉ `.env.example` được chia sẻ.
- Khuyến nghị dùng publishable/anon key phía máy chủ cùng RLS/policy tối thiểu cho bảng `wedding_wall`. Nếu buộc dùng `service_role`/secret key, chỉ lưu trong `.env` trên máy chủ; không đưa ra client và không chia sẻ file `.env`. Vì API công khai chỉ cho đọc/ghi sổ lời chúc, vẫn cần RLS đúng, HTTPS khi triển khai công khai, giới hạn tốc độ, xác thực dữ liệu và chống trùng phía máy chủ.
- Giới hạn gửi lời chúc theo tên: tối đa 3 bản ghi; endpoint Telegram cũng có giới hạn theo IP.
- Cấu hình `ADMIN_PASSWORD` bằng mật khẩu dài, riêng biệt. Tạo thêm `ACCESS_SESSION_SECRET` là chuỗi ngẫu nhiên riêng (ít nhất 32 ký tự) để ký cookie phiên Client.

## Câu chuyện tình yêu
Dữ liệu slide nằm trong thẻ JSON `lcln-story-data` của từng trang. Trong Admin, bấm ảnh thuộc phần “Chuyện tình yêu”, chọn ảnh từ thư viện/tải ảnh mới lên rồi nhấn **Lưu thay đổi**. Component không còn nền màu riêng hoặc tim bay lên.

## Thông báo gửi thành công
Lời chúc và RSVP khi lưu thành công hiển thị thông báo “Cảm ơn quý khách đã gửi lời chúc/ tham gia tiệc cưới đến gia đình chúng tôi.” kèm hiệu ứng confetti và tim. Nếu lưu thất bại, website hiển thị lỗi thay vì báo thành công giả.

## Tài nguyên bị lược bỏ
Các ảnh/icon/nhạc thiếu trong ZIP được cố ý lược bỏ trước khi tải lên, không phải lỗi cần sửa. Hãy chép tài nguyên gốc vào `public/asset/` trên máy của bạn. `npm run check` chỉ báo thông tin về tài nguyên chưa có và không thất bại vì chúng.


## Triển khai Vercel + Supabase (lưu nội dung bền vững)
1. Chạy `supabase/schema-content.sql` trong Supabase SQL Editor. Lệnh này chỉ thêm bảng nội dung `wedding_site_content`, không xoá bảng lời chúc/RSVP.
2. Supabase > Storage: tạo bucket `wedding-assets`, bật Public để khách xem ảnh/nhạc. Không cấp quyền upload công khai.
3. Vercel > Project > Settings > Environment Variables, thêm `SUPABASE_URL`, `SUPABASE_KEY` (ưu tiên secret/service_role key chỉ dùng phía server), `SUPABASE_STORAGE_BUCKET=wedding-assets`, `ADMIN_PASSWORD`, cùng các biến Telegram nếu đang sử dụng. Không đưa secret vào client code. Redeploy sau khi thêm biến.
4. Deploy repo có `vercel.json`, thư mục `api/` và script build `npm run build` (script chuẩn bị `dist/` chứa trang Admin, CSS/JS và tài nguyên tĩnh). Các endpoint API Vercel lưu HTML do Admin chỉnh vào JSONB `content.html`; khách lấy HTML qua `/api/site` khi mở/tải lại. Không có Realtime/polling.
5. Đường dẫn: `/index-nam`, `/index-gai`, `/admin-nam`, `/admin-gai`, `/admin`.

### Lưu ý kiến trúc
- **Tự động nén ảnh khi nhập mới/thay ảnh trong Admin:** ảnh raster được chuyển qua canvas sang WebP với chất lượng khoảng 84% (giảm thêm nếu tệp còn lớn); canvas giữ nguyên chính xác chiều rộng và chiều cao pixel của ảnh đã giải mã, không resize, không crop và không đổi tỷ lệ. API chỉ nhận ảnh `image/webp`, do đó không lưu ảnh JPG/PNG/GIF thô từ chức năng import. GIF động sẽ thành ảnh WebP tĩnh; định dạng mà trình duyệt không giải mã được (ví dụ một số tệp HEIC) cần chuyển sang JPG/PNG trước khi nhập. Ảnh gốc trong `public/asset/` không tự chuyển đổi; quy trình này áp dụng cho ảnh tải lên mới qua thư viện Admin.
- Admin hiện tại chỉnh sửa DOM/section và lưu bản HTML hoàn chỉnh. Để giữ nguyên toàn bộ công cụ sẵn có (sửa trực tiếp, thêm/xoá/nhân bản/kéo section, đổi ảnh/slider/title/text), HTML được lưu như một snapshot trong `content.html` của mỗi bên. Đây là đường chuyển đổi ít phá vỡ giao diện nhất; chưa cần tạo bảng cho từng section.
- Ảnh/nhạc mới tải lên Supabase Storage, không ghi vào ổ đĩa Vercel. URL tài nguyên là URL public của bucket.
- Tệp baseline HTML trong Git là phương án dự phòng khi bảng chưa có nội dung. Khi Supabase cấu hình sai, cần xem Vercel Function Logs. Client đã bỏ polling 20 giây; nội dung mới chỉ xuất hiện khi khách tải lại/mở lại trang.
- Dùng secret/service_role key ở server có quyền cao; không bao giờ đưa vào HTML/JS. Bảo vệ `ADMIN_PASSWORD` bằng mật khẩu mạnh và chỉ lưu trong Environment Variables. Nếu cần nhiều quản trị viên hoặc phân quyền chi tiết, chuyển sang Supabase Auth/JWT sau.
- Vercel functions có giới hạn request/body và thời gian chạy tuỳ gói. Bản HTML giới hạn 10 MB; nên giữ HTML gọn, ảnh upload riêng lên Storage. Upload hiện tại gửi data URL qua API nên phù hợp nhất với ảnh đã nén; tệp nhạc lớn có thể chạm giới hạn payload của Vercel và cần chuyển sang signed upload URL trực tiếp nếu bạn cần nhạc dung lượng lớn.

## Thư viện giao diện HTML/CSS/JS trong Admin

Trong menu Admin có mục **🧩 Thư viện giao diện bằng code**. Mỗi mẫu gồm tiêu đề, ghi chú, HTML, CSS và JavaScript; có thể xem trước, lưu, sửa, xoá mẫu khỏi thư viện và chèn mẫu vào thiệp đang quản lý. Mẫu được lưu trong trường JSONB `content.components` của `wedding_site_content` cho từng bên (`nam` hoặc `gai`), nên **không cần tạo thêm bảng SQL**. Sau khi chèn mẫu, bấm **Lưu thay đổi** để xuất bản; mẫu đã chèn vào thiệp sẽ không tự mất khi xoá mẫu khỏi thư viện.

Chỉ nhập code do bạn tin tưởng. JavaScript đã chèn sẽ chạy trên trang thiệp công khai. Nên dùng class riêng cho mỗi mẫu để CSS không ảnh hưởng phần còn lại. Khung xem trước chạy trong iframe sandbox riêng.

**Bảo mật Supabase:** không cấp `SELECT` trực tiếp cho `anon` trên toàn bảng `wedding_site_content`, vì JSONB trong bảng còn chứa HTML đã lưu, bản gốc/bản trước và thư viện code. Hãy dùng `supabase/schema-content.sql` trong dự án: bảng được bảo vệ bằng RLS và thu hồi quyền `anon`/`authenticated`; khách đọc nội dung đã xuất bản qua `/api/site`, còn Admin đọc/ghi qua API có mật khẩu quản trị và khóa Supabase chỉ đặt ở biến môi trường server-side.


## File môi trường `.env`
- ZIP chỉ bao gồm `.env.example`, không chứa `.env` thật hoặc mật khẩu/secret riêng.
- Sao chép `.env.example` thành `.env` khi chạy local; điền `SUPABASE_KEY` bằng secret/service_role key của dự án và đặt `ADMIN_PASSWORD`, `ACCESS_SESSION_SECRET` riêng.
- `SUPABASE_URL` và `SUPABASE_PUBLISHABLE_KEY` trong mẫu là thông tin public của dự án, không thay thế `SUPABASE_KEY` dùng cho API server-side.
- Không tải `.env` lên GitHub hoặc gửi công khai. Trên Vercel, khai báo các biến tương ứng trong Settings → Environment Variables rồi redeploy.

## Album ảnh Client và Admin
- Mở album công khai tại `/album`; nút **Xem toàn bộ album ảnh** đã có trong section Album ảnh cưới của cả Nhà trai và Nhà gái.
- Album Client dùng lưới ảnh 2 cột, lightbox, nút trước/sau, vuốt để chuyển ảnh và tự chạy theo hướng vừa vuốt.
- Trong Admin, mở menu **Album ảnh** để vào giao diện quản lý tương tự. Chọn Nhà trai/Nhà gái, thêm ảnh, thay ảnh, sửa chú thích hoặc xóa ảnh khỏi album rồi bấm **Lưu thay đổi**. Xóa khỏi album chỉ gỡ khỏi danh sách album, không xóa tệp gốc. Ảnh mới được nén WebP và lưu lên Supabase Storage.
- Danh sách album được lưu riêng trong JSONB `content.albumImages` của từng bên, không đụng tới dữ liệu RSVP/lời chúc. Nếu chưa từng lưu danh sách, Admin khởi tạo từ ảnh đang được tham chiếu trong HTML của bên đó.

## Khóa truy cập Client sau đám cưới
- Chạy bổ sung toàn bộ `supabase/schema-content.sql` trong Supabase SQL Editor để tạo bảng cấu hình truy cập và bộ đếm sai. Không xóa bảng RSVP/lời chúc.
- Trong Admin → **Bảo mật Client**, đặt mật khẩu tối thiểu 10 ký tự rồi bật yêu cầu mật khẩu. Admin vẫn dùng `ADMIN_PASSWORD` riêng. Để mở lại công khai, tắt công tắc này.
- Client và album được kiểm tra ở máy chủ. Phiên đăng nhập dùng cookie HttpOnly ký số, thời hạn 12 giờ; thay đổi mật khẩu/cấu hình sẽ làm phiên cũ hết hiệu lực.
- Mỗi địa chỉ IP được nhập sai tối đa 3 lần mỗi lượt; sau đó khóa 15 giây. Nếu tiếp tục nhập sai 3 lần sau khi mở khóa, thời gian tăng gấp đôi: 30, 60, 120 giây… tối đa 24 giờ. Bộ đếm được lưu trong Supabase nên không mất khi tải lại trang hoặc Vercel đổi instance.
- Bắt buộc khai báo `ACCESS_SESSION_SECRET` riêng trong Vercel Environment Variables và `.env` local; sau khi thêm biến, redeploy.
- Lưu ý: bucket `wedding-assets` hiện vẫn Public theo cấu hình Storage cũ. Khóa này chặn trang thiệp, album và API dữ liệu, nhưng không biến URL ảnh/nhạc public đã biết thành URL riêng tư. Muốn bảo vệ cả tệp gốc cần chuyển bucket sang Private và dùng signed URL; không nên hiểu công tắc này là cơ chế bảo vệ bản thân URL public.


## Tối ưu mobile UX/UI (bản cập nhật)
- Giữ nguyên thứ tự section và cấu trúc DOM hiện có; bổ sung lớp CSS responsive cho intro, nút bấm, form, danh sách lời chúc, gallery và lightbox. Input/textarea/select dùng cỡ chữ tối thiểu 16px để tránh iOS tự zoom khi focus.
- Các họa tiết nền rồng/phượng/mây không nhận thao tác chạm hoặc giữ; nội dung và nút chức năng vẫn tương tác bình thường.
- Tự cuộn trang tạm dừng khi chạm, vuốt, click, nhập liệu hoặc mở modal/menu; sau khi người dùng ngừng thao tác sẽ tiếp tục theo chiều vuốt gần nhất. Khi trang ẩn, vòng lặp cuộn dừng.
- Danh sách lời chúc chỉ bắt đầu sau khi intro đóng. Khi khách đóng thông báo gửi thành công, danh sách hiện lại, cuộn tới đúng lời chúc/RSVP vừa gửi và tự ẩn sau khoảng 3 giây. Chạm vào danh sách sẽ tạm dừng tự cuộn.
- Album Client tiếp tục dùng lưới 2 cột kiểu masonry, ảnh có tỷ lệ khung đa dạng; viewer tối ưu vùng hiển thị, nút chạm và thao tác vuốt.
- Admin không tự cuộn trang; thanh công cụ được tăng vùng chạm và hỗ trợ kéo thả section bằng ngón tay trên điện thoại, ngoài thao tác kéo bằng chuột trên desktop.
- Kiểm tra đã chạy: `npm run check:vercel`, `npm run build`, `node --check` các script chính. Tài nguyên ảnh/icon/nhạc bị lược bỏ trong ZIP vẫn cần khôi phục từ thư mục gốc của bạn. Chưa thực hiện kiểm thử thiết bị iPhone/Android thật hoặc xác nhận kết nối Supabase/Vercel production.
