/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { type DefaultSession } from "next-auth";

import type { User } from "@/database";

declare module "next-auth" {
  interface Session {
    user: {
      role?: User["role"];
      username?: User["username"];
    } & DefaultSession["user"];
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: User["role"];
    username?: User["username"];
  }
}
