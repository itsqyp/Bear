import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const playerProfiles = pgTable("player_profiles", {
  userId: uuid("user_id").primaryKey(),

  avatarAsset: text("avatar_asset"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
