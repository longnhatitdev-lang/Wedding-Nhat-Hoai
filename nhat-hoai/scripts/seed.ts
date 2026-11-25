import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { username } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/lib/db/schema/auth";

// Thay đổi thông tin này trước khi seed, đặc biệt trên môi trường triển khai.
const SEED_USER = {
  name: "Admin",
  username: "admin",
  password: "admin123",
};

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

  const client = postgres(process.env.DATABASE_URL, { max: 1 });
  try {
    const db = drizzle(client, { schema });
    const existing = await db.select({ id: schema.user.id }).from(schema.user)
      .where(eq(schema.user.username, SEED_USER.username.toLowerCase())).limit(1);
    if (existing.length) {
      console.log("Tài khoản đã tồn tại; bỏ qua seed.");
      return;
    }

    // Instance chỉ dùng trong script; API của website vẫn tắt đăng ký công khai.
    const seedAuth = betterAuth({
      database: drizzleAdapter(db, { provider: "pg", schema }),
      emailAndPassword: { enabled: true, autoSignIn: false },
      plugins: [username()],
    });
    // Better Auth yêu cầu email nội bộ ngay cả khi đăng nhập bằng username.
    await seedAuth.api.signUpEmail({ body: { ...SEED_USER, email: `${SEED_USER.username.toLowerCase()}@auth.invalid` } });
    console.log("Đã tạo tài khoản seed.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Không thể tạo tài khoản seed:", error.message);
  process.exitCode = 1;
});
