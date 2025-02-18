import { database, schema } from "@/database";

export async function getCategories() {
  const [companies, levels, technologies] = await Promise.all([
    database.select().from(schema.companies),
    database.select().from(schema.levels),
    database.select().from(schema.technologies),
  ]);

  return { companies, levels, technologies };
}
