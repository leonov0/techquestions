import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { questions } from "./questions";
import { users } from "./users";

export const questionReviews = pgTable("question_review", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: uuid("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  userId: uuid("userId").references(() => users.id),
  status: varchar("status", {
    length: 32,
    enum: ["pending", "approved", "rejected"],
  }).default("pending"),
  message: text("message"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const questionReviewsRelations = relations(
  questionReviews,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionReviews.questionId],
      references: [questions.id],
    }),
    user: one(users, {
      fields: [questionReviews.userId],
      references: [users.id],
    }),
  }),
);
