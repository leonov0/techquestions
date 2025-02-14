import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { questionsToLevels } from "./questions-to-levels";

export const levels = pgTable("level", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const levelsRelations = relations(levels, ({ many }) => ({
  questionsToLevels: many(questionsToLevels),
}));

export type Level = typeof levels.$inferSelect;
export type NewLevel = typeof levels.$inferInsert;
