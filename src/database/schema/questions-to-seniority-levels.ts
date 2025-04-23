import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { questions } from "./questions";
import { seniorityLevels } from "./seniority-levels";

export const questionsToSeniorityLevels = pgTable(
  "questions_to_seniority_levels",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    seniorityLevelId: uuid("seniority_level_id")
      .notNull()
      .references(() => seniorityLevels.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.questionId, table.seniorityLevelId] }),
  ],
);

export const questionsToLevelsRelations = relations(
  questionsToSeniorityLevels,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionsToSeniorityLevels.questionId],
      references: [questions.id],
    }),
    seniorityLevel: one(seniorityLevels, {
      fields: [questionsToSeniorityLevels.seniorityLevelId],
      references: [seniorityLevels.id],
    }),
  }),
);

export type QuestionsToSeniorityLevel =
  typeof questionsToSeniorityLevels.$inferSelect;
export type NewQuestionsToSeniorityLevel =
  typeof questionsToSeniorityLevels.$inferInsert;
