import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

export async function deleteLevel(id: string) {
  await database.delete(schema.levels).where(eq(schema.levels.id, id));

  revalidateTag("levels");
}
