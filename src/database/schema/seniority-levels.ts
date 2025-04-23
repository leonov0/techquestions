import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { questionsToLevels } from "./questions-to-levels";

export const seniorityLevels = pgTable("seniority_levels", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const seniorityLevelsRelations = relations(
  seniorityLevels,
  ({ many }) => ({
    questionsToLevels: many(questionsToLevels),
  }),
);

export type SeniorityLevel = typeof seniorityLevels.$inferSelect;
export type NewSeniorityLevel = typeof seniorityLevels.$inferInsert;
