import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { database } from "@/features/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(database),
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
  },
});
