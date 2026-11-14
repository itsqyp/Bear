import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import { foodCategories } from "./food-categories.js";

export const foods = pgTable("foods", {
  id: uuid("id").defaultRandom().primaryKey(),

  categoryId: uuid("category_id")
    .notNull()
    .references(() => foodCategories.id, {
      onDelete: "restrict",
    }),

  slug: text("slug").notNull().unique(),

  nameKey: text("name_key").notNull(),

  descriptionKey: text("description_key").notNull(),

  iconAsset: text("icon_asset"),

  modelAsset: text("model_asset"),

  effectConfig: jsonb("effect_config")
    .$type<Record<string, unknown>>()
    .notNull()
    .default({}),

  sortOrder: integer("sort_order").notNull().default(0),

  isAvailable: boolean("is_available").notNull().default(true),

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
