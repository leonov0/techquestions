import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

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

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 8 }).$type<AdapterAccountType>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const questions = pgTable("question", {
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
});

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

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

export type QuestionReview = typeof questionReviews.$inferSelect;
export type NewQuestionReview = typeof questionReviews.$inferInsert;
