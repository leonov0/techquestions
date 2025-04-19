import { database, schema } from "@/database";

export async function getUsers() {
  return await database.select().from(schema.users);
}
