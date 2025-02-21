"use cache";

import * as lib from "../lib";

export async function getCategories() {
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
