import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { questionsToSeniorityLevels } from "./questions-to-seniority-levels";

export const seniorityLevels = pgTable("seniority_levels", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const seniorityLevelsRelations = relations(
  seniorityLevels,
  ({ many }) => ({
    questionsToSeniorityLevels: many(questionsToSeniorityLevels),
  }),
);

export type SeniorityLevel = typeof seniorityLevels.$inferSelect;
export type NewSeniorityLevel = typeof seniorityLevels.$inferInsert;
