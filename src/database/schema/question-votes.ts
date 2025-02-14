import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { questions } from "./questions";
import { users } from "./users";

export const questionVotes = pgTable(
  "question_vote",
  {
    questionId: uuid("questionId")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    userId: uuid("userId").references(() => users.id),
    vote: integer("vote"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.questionId, table.userId] })],
);

export const questionVotesRelations = relations(questionVotes, ({ one }) => ({
  question: one(questions, {
    fields: [questionVotes.questionId],
    references: [questions.id],
  }),
  user: one(users, {
    fields: [questionVotes.userId],
    references: [users.id],
  }),
}));
