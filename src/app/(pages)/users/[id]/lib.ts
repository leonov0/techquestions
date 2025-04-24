import { eq } from "drizzle-orm";

import { database, schema } from "@/database";

export async function getUserByUsername(username: string) {
  const rows = await database
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username))
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}
