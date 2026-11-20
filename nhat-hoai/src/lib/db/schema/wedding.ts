import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const weddingWishes = pgTable("wedding_wishes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  side: text("side").notNull(),
  status: text("status").notNull(),
  guests: integer("guests").notNull().default(0),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const weddingSettings = pgTable("wedding_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const weddingAlbumFiles = pgTable("wedding_album_files", {
  id: text("id").primaryKey(),
  mimeType: text("mime_type").notNull(),
  data: text("data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
