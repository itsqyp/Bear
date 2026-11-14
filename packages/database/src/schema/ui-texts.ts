import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const uiTexts = pgTable(
  "ui_texts",
  {
    key: text("key").notNull(),

    locale: text("locale").notNull(),

    value: text("value").notNull(),

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
  },
  (table) => [
    primaryKey({
      columns: [table.key, table.locale],
    }),
  ],
);
