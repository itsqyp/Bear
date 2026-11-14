import {
  pgTable,
  uuid,
  integer,
  timestamp,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { matches } from "./matches.js";
import { bearSpecies } from "./bears.js";

export const matchParticipants = pgTable(
  "match_participants",
  {
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id, {
        onDelete: "cascade",
      }),

    // References the authenticated account.
    // I'll add its foreign-key constraint when I create
    // the Better Auth user schema.
    userId: uuid("user_id").notNull(),

    selectedBearSpeciesId: uuid("selected_bear_species_id")
      .notNull()
      .references(() => bearSpecies.id, {
        onDelete: "restrict",
      }),

    placement: integer("placement"),

    score: integer("score").notNull().default(0),

    kills: integer("kills").notNull().default(0),

    joinedAt: timestamp("joined_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    leftAt: timestamp("left_at", {
      withTimezone: true,
    }),
  },
  (table) => [
    primaryKey({
      columns: [table.matchId, table.userId],
    }),

    index("match_participants_user_id_idx").on(table.userId),
  ],
);
