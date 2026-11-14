import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./auth.js";

export const playerProfiles = pgTable("player_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

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
