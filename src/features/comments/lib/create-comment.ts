import { revalidateTag } from "next/cache";

import { database, type NewComment, schema } from "@/database";

export async function createComment(values: NewComment) {
  revalidateTag("comments");

  await database.insert(schema.comments).values(values);
}
