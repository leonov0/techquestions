"use server";

import { signIn } from "@/features/auth";

export async function signInWithGitHub(redirectTo?: string) {
  await signIn("github", { redirectTo });
}
