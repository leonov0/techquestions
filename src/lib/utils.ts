import { type ClassValue, clsx } from "clsx";
import { ilike } from "drizzle-orm";
import { twMerge } from "tailwind-merge";

import { database, schema } from "@/database";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createBaseFromEmail(email: string) {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9_.]/g, "");
  return base.length > 0 ? base.slice(0, 30) : "user";
}

export async function getUsernamesStartingWith(prefix: string) {
  const results = await database
    .select({ username: schema.users.username })
    .from(schema.users)
    .where(ilike(schema.users.username, `${prefix}%`));

  return new Set(results.map((u) => u.username));
}
