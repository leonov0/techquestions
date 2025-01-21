import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
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

export const usersRelations = relations(users, ({ many }) => ({
  questionVotes: many(questionVotes),
}));

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
  (table) => ({
    searchIndex: index("search_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', ${table.title}), 'A') ||
          setweight(to_tsvector('english', ${table.body}), 'B')
      )`,
    ),
  }),
);

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

export const questionsRelations = relations(users, ({ many }) => ({
  questionsToCompanies: many(questionsToCompanies),
  questionsToTechnologies: many(questionsToTechnologies),
  questionsToLevels: many(questionsToLevels),
  questionVotes: many(questionVotes),
}));

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

export const companies = pgTable("company", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;

export const companiesRelations = relations(companies, ({ many }) => ({
  questionsToCompanies: many(questionsToCompanies),
}));

export const questionsToCompanies = pgTable(
  "questions_to_companies",
  {
    questionId: uuid("questionId")
      .notNull()
      .references(() => questions.id),
    companyId: uuid("companyId")
      .notNull()
      .references(() => companies.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.questionId, t.companyId] }),
  }),
);

export const technologies = pgTable("technology", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type Technology = typeof technologies.$inferSelect;
export type NewTechnology = typeof technologies.$inferInsert;

export const technologiesRelations = relations(technologies, ({ many }) => ({
  questionsToTechnologies: many(questionsToTechnologies),
}));

export const questionsToTechnologies = pgTable(
  "questions_to_technologies",
  {
    questionId: uuid("questionId")
      .notNull()
      .references(() => questions.id),
    technologyId: uuid("technologyId")
      .notNull()
      .references(() => technologies.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.questionId, t.technologyId] }),
  }),
);

export const levels = pgTable("level", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type Level = typeof levels.$inferSelect;
export type NewLevel = typeof levels.$inferInsert;

export const levelsRelations = relations(levels, ({ many }) => ({
  questionsToLevels: many(questionsToLevels),
}));

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
  (t) => ({
    pk: primaryKey({ columns: [t.questionId, t.levelId] }),
  }),
);

export const questionVotes = pgTable("question_vote", {
  questionId: uuid("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  userId: uuid("userId").references(() => users.id),
  vote: integer("vote"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const questionVotesRelations = relations(questionVotes, ({ one }) => ({
  user: one(users, {
    fields: [questionVotes.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [questionVotes.questionId],
    references: [questions.id],
  }),
}));
