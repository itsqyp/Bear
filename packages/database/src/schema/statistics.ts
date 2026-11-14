import {
  pgTable,
  uuid,
  integer,
  bigint,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const playerStatistics = pgTable(
  "player_statistics",
  {
    userId: uuid("user_id").primaryKey(),

    matchesPlayed: integer("matches_played").notNull().default(0),

    wins: integer("wins").notNull().default(0),

    losses: integer("losses").notNull().default(0),

    totalScore: bigint("total_score", {
      mode: "number",
    })
      .notNull()
      .default(0),

    totalKills: integer("total_kills").notNull().default(0),

    totalPlaytimeSeconds: bigint("total_playtime_seconds", {
      mode: "number",
    })
      .notNull()
      .default(0),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check("player_statistics_matches_check", sql`${table.matchesPlayed} >= 0`),

    check("player_statistics_wins_check", sql`${table.wins} >= 0`),

    check("player_statistics_losses_check", sql`${table.losses} >= 0`),

    check("player_statistics_score_check", sql`${table.totalScore} >= 0`),

    check("player_statistics_kills_check", sql`${table.totalKills} >= 0`),

    check(
      "player_statistics_playtime_check",
      sql`${table.totalPlaytimeSeconds} >= 0`,
    ),

    check(
      "player_statistics_results_check",
      sql`${table.wins} + ${table.losses} <= ${table.matchesPlayed}`,
    ),
  ],
);
