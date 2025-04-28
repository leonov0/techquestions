"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { database, schema } from "@/database";
import { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

export async function getUserData(): Promise<ActionResponse<unknown>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const data = await database.query.users.findFirst({
    where: eq(schema.users.id, session.user.id),
    with: {
      sessions: true,
      accounts: {
        columns: {
          password: false,
        },
      },
      questions: true,
      comments: true,
      commentVotes: true,
      questionVotes: true,
    },
    columns: {
      role: false,
    },
  });

  return {
    success: true,
    data,
  };
}
