import { eq } from "drizzle-orm";

import { database, schema } from "@/database";

export async function deleteUser(id: string) {
  await database.delete(schema.accounts).where(eq(schema.accounts.userId, id));

  await database
    .update(schema.questions)
    .set({ userId: null })
    .where(eq(schema.questions.userId, id));

  await database
    .delete(schema.questionVotes)
    .where(eq(schema.questionVotes.userId, id));

  await database
    .update(schema.questionReviews)
    .set({ userId: null })
    .where(eq(schema.questionReviews.userId, id));

  await database.delete(schema.users).where(eq(schema.users.id, id));
}
