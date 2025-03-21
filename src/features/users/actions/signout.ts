import { signOut } from "@/features/auth";

export async function SignOut() {
  await signOut({ redirectTo: "/" });
}
