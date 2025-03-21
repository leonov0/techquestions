import { ilike } from "drizzle-orm";

import { database, schema } from "@/database";

export async function createUsernameFromEmail(email: string) {
  let usernameBase = email
    .split("@")[0]
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 32);

  if (usernameBase.length < 3) {
    usernameBase += "user";
  }

  const usersWithSameBase = await database
    .select({ username: schema.users.username })
    .from(schema.users)
    .where(ilike(schema.users.username, `${usernameBase}%`))
    .limit(1);

  let username = usernameBase;

  while (usersWithSameBase.some((user) => user.username === username)) {
    username = usernameBase.slice(0, 28) + Math.floor(Math.random() * 10000);
  }

  return username;
}
