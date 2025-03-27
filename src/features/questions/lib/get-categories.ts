"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getCompanies() {
  cacheTag("companies");

  return database.select().from(schema.companies);
}

export async function getLevels() {
  cacheTag("levels");

  return database.select().from(schema.levels);
}

export async function getTechnologies() {
  cacheTag("technologies");

  return database.select().from(schema.technologies);
}
