import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { questionReviews } from "./question-reviews";
import { questionVotes } from "./question-votes";
import { questions } from "./questions";

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 2048 }),
  username: varchar("username", { length: 32 }).unique(),
  role: varchar("role", { length: 32, enum: ["user", "admin"] }).default(
    "user",
  ),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  questionReviews: many(questionReviews),
  questions: many(questions),
  questionVotes: many(questionVotes),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
