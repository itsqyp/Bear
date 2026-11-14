import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";

import { matchStatusEnum } from "./enum.js";

export const matches = pgTable(
  "matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    status: matchStatusEnum("status").notNull().default("waiting"),

    // Identifies the game server that hosted this match.
    serverId: text("server_id"),

    startedAt: timestamp("started_at", {
      withTimezone: true,
    }),

    endedAt: timestamp("ended_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("matches_status_idx").on(table.status),
    index("matches_created_at_idx").on(table.createdAt),
  ],
);
