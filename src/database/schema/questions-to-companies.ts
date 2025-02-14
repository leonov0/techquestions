import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { companies } from "./companies";
import { questions } from "./questions";

export const questionsToCompanies = pgTable(
  "questions_to_companies",
  {
    questionId: uuid("questionId")
      .notNull()
      .references(() => questions.id),
    companyId: uuid("companyId")
      .notNull()
      .references(() => companies.id),
  },
  (table) => [primaryKey({ columns: [table.questionId, table.companyId] })],
);

export const questionsToCompaniesRelations = relations(
  questionsToCompanies,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionsToCompanies.questionId],
      references: [questions.id],
    }),
    company: one(companies, {
      fields: [questionsToCompanies.companyId],
      references: [companies.id],
    }),
  }),
);

export type QuestionsToCompany = typeof questionsToCompanies.$inferSelect;
export type NewQuestionsToCompany = typeof questionsToCompanies.$inferInsert;
