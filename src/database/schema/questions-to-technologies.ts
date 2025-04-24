import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { questions } from "./questions";
import { technologies } from "./technologies";

export const questionsToTechnologies = pgTable(
  "questions_to_technologies",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    technologyId: uuid("technology_id")
      .notNull()
      .references(() => technologies.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.questionId, table.technologyId] })],
);

export const questionsToTechnologiesRelations = relations(
  questionsToTechnologies,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionsToTechnologies.questionId],
      references: [questions.id],
    }),
    technology: one(technologies, {
      fields: [questionsToTechnologies.technologyId],
      references: [technologies.id],
    }),
  }),
);

export type QuestionsToTechnology = typeof questionsToTechnologies.$inferSelect;
export type NewQuestionsToTechnology =
  typeof questionsToTechnologies.$inferInsert;
