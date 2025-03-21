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
  } catch (e) {
    const error =
      e instanceof Error
        ? e.message
        : "Unexpected error. Please try again later.";

    return { data: null, error };
  }
}
