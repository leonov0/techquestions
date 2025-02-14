import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { questionsToCompanies } from "./questions-to-companies";

export const companies = pgTable("company", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  questionsToCompanies: many(questionsToCompanies),
}));
