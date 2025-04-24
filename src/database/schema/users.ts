import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { questionReviews } from "./question-reviews";
import { questionVotes } from "./question-votes";
import { questions } from "./questions";
import { sessions } from "./sessions";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  username: varchar("username", { length: 32 }).unique(),
  displayUsername: varchar("display_username", { length: 32 }),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  questionReviews: many(questionReviews),
  questions: many(questions),
  questionVotes: many(questionVotes),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
