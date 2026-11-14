import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const bearSpecies = pgTable("bear_species", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug").notNull().unique(),

  nameKey: text("name_key").notNull(),

  descriptionKey: text("description_key").notNull(),

  iconAsset: text("icon_asset"),

  modelAsset: text("model_asset"),

  sortOrder: integer("sort_order").notNull().default(0),

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
