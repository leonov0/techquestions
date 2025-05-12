"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { database, schema } from "@/database";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

type Achievement = {
  id: string;
  name: string;
  description: string;
  progress: number;
  total: number;
  completed: boolean;
};

export async function getAchievements(): Promise<
  ActionResponse<Achievement[]>
> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const isFirstQuestionCompleted = await getFirstQuestion(session.user.id);

    const data: Achievement[] = [
      {
        id: "1",
        name: "Create an Account",
        description:
          "Create an account to start using the app. This is the first step to earning achievements.",
        progress: 1,
        total: 1,
        completed: true,
      },
      {
        id: "2",
        name: "First Question",
        description:
          "Submit your first question, which will be approved by the moderator.",
        progress: isFirstQuestionCompleted ? 1 : 0,
        total: 1,
        completed: isFirstQuestionCompleted,
      },
    ];

    data.sort((a, b) => {
      if (a.completed && !b.completed) {
        return -1;
      }
      if (!a.completed && b.completed) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to fetch achievements. Please try again later.",
    };
  }
}

async function getFirstQuestion(userId: string) {
  const [question] = await database
    .select()
    .from(schema.questions)
    .where(
      and(
        eq(schema.questions.userId, userId),
        eq(schema.questions.status, "approved"),
      ),
    )
    .limit(1);

  return question !== undefined;
}
