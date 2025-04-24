import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { questions } from "./questions";
import { users } from "./users";

export const questionReviews = pgTable("question_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  status: varchar("status", {
    length: 32,
    enum: ["pending", "approved", "rejected"],
  }).default("pending"),
  message: text("message"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
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

export type QuestionReview = typeof questionReviews.$inferSelect;
export type NewQuestionReview = typeof questionReviews.$inferInsert;
