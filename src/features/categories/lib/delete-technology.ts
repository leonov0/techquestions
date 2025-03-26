import { eq } from "drizzle-orm";

import { database, schema } from "@/database";

export async function deleteTechnology(id: string) {
  await database
    .delete(schema.technologies)
    .where(eq(schema.technologies.id, id));
}
