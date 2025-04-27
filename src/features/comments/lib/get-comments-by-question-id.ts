"use cache";

import { desc, eq, sql } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getCommentsByQuestionId(
  questionId: string,
  order: "new" | "top" = "top",
) {
  cacheTag("comments");

  const orderBy =
    order === "new"
      ? desc(schema.comments.createdAt)
      : desc(sql`COALESCE(SUM(${schema.commentVotes.vote}), 0)`);

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
      rating: sql<number>`COALESCE(SUM(${schema.commentVotes.vote}), 0)`,
    })
    .from(schema.comments)
    .leftJoin(schema.users, eq(schema.comments.userId, schema.users.id))
    .leftJoin(
      schema.commentVotes,
      eq(schema.comments.id, schema.commentVotes.commentId),
    )
    .where(eq(schema.comments.questionId, questionId))
    .groupBy(schema.comments.id, schema.users.id)
    .orderBy(orderBy);

  return comments;
}
