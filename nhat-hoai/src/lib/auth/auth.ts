import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { username } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  trustedOrigins: ["https://test.aiempie.cloud"],
  emailAndPassword: { enabled: true, disableSignUp: true },
  plugins: [username()],
  disabledPaths: ["/sign-in/email"],
});
