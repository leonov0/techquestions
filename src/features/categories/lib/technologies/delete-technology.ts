import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

export async function deleteTechnology(id: string) {
  await database
    .delete(schema.technologies)
    .where(eq(schema.technologies.id, id));

  revalidateTag("technologies");
}
