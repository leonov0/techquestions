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

import { questionReviews } from "./question-reviews";
import { questionVotes } from "./question-votes";
import { questionsToCompanies } from "./questions-to-companies";
import { questionsToLevels } from "./questions-to-levels";
import { questionsToTechnologies } from "./questions-to-technologies";
import { users } from "./users";

export const questions = pgTable(
  "question",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }),
    body: text("body"),
    userId: uuid("userId").references(() => users.id),
    isAnonymous: boolean("isAnonymous").default(false),
    status: varchar("status", {
      length: 32,
      enum: ["pending", "approved", "rejected"],
    }).default("pending"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
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
  questionsToLevels: many(questionsToLevels),
  questionsToTechnologies: many(questionsToTechnologies),
}));
