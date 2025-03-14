"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import * as lib from "../lib";

export async function getCategories() {
  cacheTag("categories");

  try {
    const data = await lib.getCategories();

    return { data, error: null };
  } catch {
    return {
      data: { technologies: [], companies: [], levels: [] },
      error: "Failed to get categories",
    };
  }
}
