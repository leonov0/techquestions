import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { comments } from "./comments";
import { questionReviews } from "./question-reviews";
import { questionVotes } from "./question-votes";
import { questionsToCompanies } from "./questions-to-companies";
import { questionsToSeniorityLevels } from "./questions-to-seniority-levels";
import { questionsToTechnologies } from "./questions-to-technologies";
import { users } from "./users";

export const questions = pgTable(
  "questions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    body: text("body"),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    isAnonymous: boolean("is_anonymous").notNull().default(false),
    status: varchar("status", {
      length: 32,
      enum: ["pending", "approved", "rejected"],
    })
      .notNull()
      .default("pending"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => [
    index("search_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', ${table.title}), 'A') ||
          setweight(to_tsvector('english', ${table.body}), 'B')
      )`,
    ),
  ],
);

export const questionsRelations = relations(questions, ({ one, many }) => ({
  user: one(users, {
    fields: [questions.userId],
    references: [users.id],
  }),
  questionReviews: many(questionReviews),
  questionVotes: many(questionVotes),
  questionsToCompanies: many(questionsToCompanies),
  questionsToSeniorityLevels: many(questionsToSeniorityLevels),
  questionsToTechnologies: many(questionsToTechnologies),
  comments: many(comments),
}));

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
