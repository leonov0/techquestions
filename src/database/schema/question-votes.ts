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
  "question_votes",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    vote: integer("vote").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
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

export type QuestionVote = typeof questionVotes.$inferSelect;
export type NewQuestionVote = typeof questionVotes.$inferInsert;
