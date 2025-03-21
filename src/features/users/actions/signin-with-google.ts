"use server";

import { signIn } from "@/features/auth";

export async function signInWithGoogle(redirectTo?: string) {
  await signIn("google", { redirectTo });
}
