import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  index,
  unique,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { matchStatusEnum, matchTypeEnum } from "./enums.js";

export const matches = pgTable(
  "matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    type: matchTypeEnum("type").notNull().default("public"),

    status: matchStatusEnum("status").notNull().default("waiting"),

    // Maximum permitted players: 2–8.
    maxPlayers: integer("max_players").notNull().default(8),

    // Hashed invitation code for custom matches.
    joinCodeHash: text("join_code_hash"),

    // Identifies the authoritative game server.
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

    index("matches_type_idx").on(table.type),

    index("matches_created_at_idx").on(table.createdAt),

    unique("matches_join_code_hash_unique").on(table.joinCodeHash),

    check(
      "matches_max_players_check",
      sql`${table.maxPlayers} BETWEEN 2 AND 8`,
    ),

    check(
      "matches_join_code_check",
      sql`
        (${table.type} = 'public' AND ${table.joinCodeHash} IS NULL)
        OR
        (${table.type} = 'custom' AND ${table.joinCodeHash} IS NOT NULL)
      `,
    ),
  ],
);
