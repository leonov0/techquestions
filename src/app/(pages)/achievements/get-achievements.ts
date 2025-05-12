"use server";

import { headers } from "next/headers";

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
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const data: Achievement[] = [
      {
        id: "1",
        name: "First Question",
        description:
          "Submit your first question, which will be approved by the moderator.",
        progress: 0,
        total: 1,
        completed: false,
      },
      {
        id: "2",
        name: "Create an Account",
        description:
          "Create an account to start using the app. This is the first step to earning achievements.",
        progress: 1,
        total: 1,
        completed: true,
      },
    ];

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to fetch achievements. Please try again later.",
    };
  }
}
