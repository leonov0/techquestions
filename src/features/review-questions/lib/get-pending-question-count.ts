import { count, eq } from "drizzle-orm";

import { database, schema } from "@/database";

export async function getPendingQuestionCount() {
  const rows = await database
    .select({ count: count() })
    .from(schema.questions)
    .where(eq(schema.questions.status, "pending"));

  return rows[0].count;
}
