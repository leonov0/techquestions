import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

export async function deleteSeniorityLevel(id: string) {
  await database
    .delete(schema.questionsToSeniorityLevels)
    .where(eq(schema.questionsToSeniorityLevels.seniorityLevelId, id));

  await database
    .delete(schema.seniorityLevels)
    .where(eq(schema.seniorityLevels.id, id));

  revalidateTag("seniority-levels");
}
