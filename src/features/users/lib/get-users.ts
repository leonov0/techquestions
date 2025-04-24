import { database, schema, type User } from "@/database";

export async function getUsers(): Promise<User[]> {
  const users = await database.select().from(schema.users);

  return users;
}
