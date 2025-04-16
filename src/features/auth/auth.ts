import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { database } from "@/database";
import {
  createUsernameFromEmail,
  getUser,
  updateUser,
} from "@/features/users/lib";

import { protectedRoutes } from "./protected-routes";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(database),
  providers: [
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Google({ allowDangerousEmailAccountLinking: true }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    newUser: "/complete-profile",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;

      if (pathname === "/signin" && auth) {
        const url = new URL("/", request.nextUrl.origin).toString();

        return NextResponse.redirect(url);
      }

      if (protectedRoutes.includes(pathname) && !auth) {
        return false;
      }

      if (pathname.startsWith("/admin") && auth?.user.role !== "admin") {
        return false;
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (!user?.id || !user?.email) {
        return token;
      }

      if (trigger === "signUp") {
        const username = await createUsernameFromEmail(user.email);

        await updateUser(user.id, { username });
      }

      const existingUser = await getUser(user.id);

      if (existingUser) {
        token.role = existingUser.role;
        token.username = existingUser.username;
      }

      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      session.user.role = token.role;
      session.user.username = token.username;

      return session;
    },
  },
});
