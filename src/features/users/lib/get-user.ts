import { eq } from "drizzle-orm";

import { database, schema, type User } from "@/database";

export async function getUser(id: string): Promise<User | undefined> {
  const [user] = await database
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
    .limit(1);

  return user;
}
