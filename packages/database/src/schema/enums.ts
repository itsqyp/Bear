import { pgEnum } from "drizzle-orm/pg-core";

export const matchStatusEnum = pgEnum("match_status", [
  "waiting",
  "active",
  "completed",
  "abandoned",
]);

export const matchTypeEnum = pgEnum("match_type", ["public", "custom"]);
