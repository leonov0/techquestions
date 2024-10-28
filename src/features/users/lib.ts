import { eq, ilike } from "drizzle-orm";

import { database, type User, users } from "@/features/database";

import { updateUserSchema } from "./schemas";
import type { UpdateUserPayload } from "./types";

export async function getUser(id: User["id"]) {
  const result = await database
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (result.length === 0) {
    throw new Error("User not found");
  }

  return result[0];
}

export async function createUsernameFromEmail(email: string) {
  let usernameBase = email
    .split("@")[0]
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 32);

  if (usernameBase.length < 3) {
    usernameBase += "user";
  }

  const usersWithSameBase = await database
    .select({ username: users.username })
    .from(users)
    .where(ilike(users.username, `${usernameBase}%`))
    .limit(1);

  let username = usernameBase;

  while (usersWithSameBase.some((user) => user.username === username)) {
    username = usernameBase.slice(0, 28) + Math.floor(Math.random() * 10000);
  }

  return username;
}

export async function updateUser(
  userId: User["id"],
  payload: UpdateUserPayload,
) {
  const userData = await updateUserSchema.parseAsync(payload);

  if (userData.username) {
    const result = await database
      .select({ id: users.id, username: users.username })
      .from(users)
      .where(eq(users.username, userData.username))
      .limit(1);

    if (result.length > 0 && result[0].id !== userId) {
      throw new Error(`Username ${payload.username} is already taken`);
    }
  }

  await database.update(users).set(userData).where(eq(users.id, userId));
}
