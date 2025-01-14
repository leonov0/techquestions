import * as lib from "./lib";

export async function getQuestion(id: string) {
  try {
    const data = await lib.getQuestion(id);

    return { data, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unexpected error";

    return { data: null, error };
  }
}
