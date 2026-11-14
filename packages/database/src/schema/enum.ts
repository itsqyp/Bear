import { pgEnum } from "drizzle-orm/pg-core";

export const matchStatusEnum = pgEnum("match_status", [
  "waiting",
  "active",
  "completed",
  "abandoned",
]);
