# Nhật & Hoài

Ứng dụng Next.js dùng PostgreSQL, Drizzle ORM và Better Auth.

## Cấu hình local

1. Tạo database PostgreSQL `longnhat` và thiết lập `.env`:

   ```dotenv
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/longnhat
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=<chuoi-ngau-nhien-it-nhat-32-ky-tu>
   ```

   Có thể tạo secret bằng `openssl rand -hex 32`. Giữ secret và thông tin kết nối ở server.
2. Chạy `pnpm install`, `pnpm db:push`, sau đó `pnpm dev`.
3. Mở http://localhost:3000. API xác thực nằm tại `/api/auth/*`.

Thiệp nhà trai ở `/`, thiệp nhà gái ở `/nha-gai`, album ở `/album`. Lời chúc và xác nhận tham dự được lưu trong bảng `wedding_wishes` thông qua server action.

Trang quản trị bắt đầu tại `/admin` và yêu cầu đăng nhập qua `/admin/login`. Các mục `/admin/nha-trai`, `/admin/nha-gai` quản lý thông tin buổi lễ; `/admin/album` cho phép thêm ảnh bằng đường dẫn hoặc tải ảnh JPEG, PNG, WebP tối đa 4 MB, chỉnh chú thích và sắp xếp ảnh. Ảnh tải lên được lưu trong PostgreSQL; xóa ảnh khỏi danh sách album không xóa tệp gốc. Trước khi có cấu hình được lưu, thiệp và album dùng dữ liệu mẫu trong source.

Nếu cần nhận thông báo Telegram, thêm `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` vào môi trường server. Việc gửi thông báo không ảnh hưởng đến việc lưu lời chúc.

## Database và xác thực

- `src/lib/db/schema/auth.ts` định nghĩa bốn bảng Better Auth. Thêm schema theo chức năng vào thư mục `schema` và export từ `schema/index.ts`. Chạy `pnpm db:push` để đồng bộ schema trực tiếp với database mới; dự án không duy trì migration.
- `pnpm db:studio` mở Drizzle Studio.
- Đổi `SEED_USER` ở đầu `scripts/seed.ts`, sau đó chạy `pnpm db:seed` để tạo tài khoản đăng nhập. Seed bỏ qua username đã tồn tại và không đổi mật khẩu. Thông tin mẫu trong source chỉ dành cho local; không dùng trên môi trường công khai.
- Đăng nhập bằng username/mật khẩu qua `authClient.signIn.username`. Better Auth vẫn yêu cầu email nội bộ cho mỗi tài khoản; seed tạo địa chỉ `@auth.invalid`, không dùng để nhận thư. Đăng ký công khai đang tắt và chưa có giao diện đăng nhập.
- Trên môi trường triển khai tại `test.aiempie.cloud`, đặt `BETTER_AUTH_URL=https://test.aiempie.cloud`, cùng `DATABASE_URL` và `BETTER_AUTH_SECRET` riêng. Với PostgreSQL serverless, chọn connection pool phù hợp với môi trường.
