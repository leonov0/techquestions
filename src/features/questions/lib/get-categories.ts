"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getCompanies() {
  cacheTag("companies");

  return database
    .select({
      id: schema.companies.id,
      name: schema.companies.name,
    })
    .from(schema.companies)
    .orderBy(schema.companies.name);
}

export async function getLevels() {
  cacheTag("seniority-levels");

  return database
    .select({
      id: schema.seniorityLevels.id,
      name: schema.seniorityLevels.name,
    })
    .from(schema.seniorityLevels)
    .orderBy(schema.seniorityLevels.name);
}

export async function getTechnologies() {
  cacheTag("technologies");

  return database
    .select({
      id: schema.technologies.id,
      name: schema.technologies.name,
    })
    .from(schema.technologies)
    .orderBy(schema.technologies.name);
}
