import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { questions } from "./questions";
import { seniorityLevels } from "./seniority-levels";

export const questionsToLevels = pgTable(
  "questions_to_levels",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    levelId: uuid("level_id")
      .notNull()
      .references(() => seniorityLevels.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.questionId, table.levelId] })],
);

export const questionsToLevelsRelations = relations(
  questionsToLevels,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionsToLevels.questionId],
      references: [questions.id],
    }),
    seniorityLevel: one(seniorityLevels, {
      fields: [questionsToLevels.levelId],
      references: [seniorityLevels.id],
    }),
  }),
);

export type QuestionsToLevel = typeof questionsToLevels.$inferSelect;
export type NewQuestionsToLevel = typeof questionsToLevels.$inferInsert;
