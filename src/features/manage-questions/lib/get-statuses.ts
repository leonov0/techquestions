"use cache";

import { database, questions } from "@/database";

export async function getStatuses() {
  const rows = await database
    .selectDistinct({ status: questions.status })
    .from(questions);

  return rows.map((row) => row.status);
}
