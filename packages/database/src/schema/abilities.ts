import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  integer,
  primaryKey,
  unique,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { bearSpecies } from "./bears.js";

export const abilities = pgTable("abilities", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug").notNull().unique(),

  nameKey: text("name_key").notNull(),

  descriptionKey: text("description_key").notNull(),

  iconAsset: text("icon_asset"),

  config: jsonb("config")
    .$type<Record<string, unknown>>()
    .notNull()
    .default({}),

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

export const bearSpeciesAbilities = pgTable(
  "bear_species_abilities",
  {
    speciesId: uuid("species_id")
      .notNull()
      .references(() => bearSpecies.id, {
        onDelete: "cascade",
      }),

    abilityId: uuid("ability_id")
      .notNull()
      .references(() => abilities.id, {
        onDelete: "cascade",
      }),

    slot: integer("slot").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.speciesId, table.slot],
    }),

    unique().on(table.speciesId, table.abilityId),

    check("bear_ability_slot_check", sql`${table.slot} IN (1, 2)`),
  ],
);
