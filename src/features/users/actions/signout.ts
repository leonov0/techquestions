"use server";

import { signOut as performSignOut } from "@/features/auth";

export async function signOut() {
  await performSignOut({ redirectTo: "/" });
}
