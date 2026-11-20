<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Database schema

- Đặt schema Drizzle trong `src/lib/db/schema/`, mỗi chức năng một file riêng (ví dụ `auth.ts`); export các file từ `schema/index.ts`.
- Xem database như database mới: không tạo hoặc duy trì migration, dùng `pnpm db:push` để đồng bộ schema.
