"use server";

import { auth } from "@/features/auth";

import * as lib from "../lib";

export async function getQuestion(id: string) {
  const session = await auth();

  try {
    const data = await lib.getQuestion(id);

    if (
      session?.user.role !== "admin" &&
      (data == null || data.status !== "approved")
    ) {
      return { data: null, error: "Question not found." };
    }

    return { data, error: null };
  } catch {
    return {
      data: null,
      error: "Failed to get question. Please try again later.",
    };
  }
}
