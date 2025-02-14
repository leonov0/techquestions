import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { questions } from "./questions";
import { technologies } from "./technologies";

export const questionsToTechnologies = pgTable(
  "questions_to_technologies",
  {
    questionId: uuid("questionId")
      .notNull()
      .references(() => questions.id),
    technologyId: uuid("technologyId")
      .notNull()
      .references(() => technologies.id),
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
