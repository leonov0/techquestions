import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { levels } from "./levels";
import { questions } from "./questions";

export const questionsToLevels = pgTable(
  "questions_to_levels",
  {
    questionId: uuid("questionId")
      .notNull()
      .references(() => questions.id),
    levelId: uuid("levelId")
      .notNull()
      .references(() => levels.id),
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
    level: one(levels, {
      fields: [questionsToLevels.levelId],
      references: [levels.id],
    }),
  }),
);
