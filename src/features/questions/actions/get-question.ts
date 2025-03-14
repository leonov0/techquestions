"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import * as lib from "../lib";

export async function getQuestion(id: string) {
  cacheTag(`questions-${id}`);

  try {
    const data = await lib.getQuestion(id);

    return { data, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unexpected error";

    return { data: null, error };
  }
}
