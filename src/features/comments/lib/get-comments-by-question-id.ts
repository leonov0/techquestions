"use cache";

import { eq, sql } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getCommentsByQuestionId(questionId: string) {
  cacheTag("comments");

  const comments = await database
    .select({
      id: schema.comments.id,
      message: schema.comments.message,
      createdAt: schema.comments.createdAt,
      updatedAt: schema.comments.updatedAt,
      author: sql<{
        id: string;
        username: string;
        image: string | null;
      }>`jsonb_build_object('id', ${schema.users.id}, 'username', ${schema.users.displayUsername}, 'image', ${schema.users.image})`,
    })
    .from(schema.comments)
    .leftJoin(schema.users, eq(schema.comments.userId, schema.users.id))
    .where(eq(schema.comments.questionId, questionId));

  return comments;
}
