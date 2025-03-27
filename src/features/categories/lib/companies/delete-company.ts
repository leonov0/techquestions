import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

export async function deleteCompany(id: string) {
  await database.delete(schema.companies).where(eq(schema.companies.id, id));

  revalidateTag("companies");
}
