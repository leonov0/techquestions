import { and, desc, eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { UpdateQuestionPayload } from "./types";

export async function updateQuestion(payload: UpdateQuestionPayload) {
  revalidateTag("questions");

  await database.transaction(async (tx) => {
    await tx
      .update(schema.questions)
      .set({
        title: payload.title,
        body: payload.body,
        isAnonymous: payload.isAnonymous,
        status: payload.status,
      })
      .where(eq(schema.questions.id, payload.id));

    await Promise.all([
      tx
        .delete(schema.questionsToTechnologies)
        .where(eq(schema.questionsToTechnologies.questionId, payload.id)),
      tx
        .delete(schema.questionsToCompanies)
        .where(eq(schema.questionsToCompanies.questionId, payload.id)),
      tx
        .delete(schema.questionsToSeniorityLevels)
        .where(eq(schema.questionsToSeniorityLevels.questionId, payload.id)),
    ]);

    if (payload.technologies.length) {
      await tx.insert(schema.questionsToTechnologies).values(
        payload.technologies.map((technologyId) => ({
          questionId: payload.id,
          technologyId,
        })),
      );
    }

    if (payload.companies.length) {
      await tx.insert(schema.questionsToCompanies).values(
        payload.companies.map((companyId) => ({
          questionId: payload.id,
          companyId,
        })),
      );
    }

    if (payload.seniorityLevels.length) {
      await tx.insert(schema.questionsToSeniorityLevels).values(
        payload.seniorityLevels.map((seniorityLevelId) => ({
          questionId: payload.id,
          seniorityLevelId,
        })),
      );
    }
  });
}

export async function isQuestionPresent(id: string, userId: string) {
  const rows = await database
    .select()
    .from(schema.questions)
    .where(
      and(eq(schema.questions.id, id), eq(schema.questions.userId, userId)),
    )
    .limit(1);

  return rows.length > 0;
}

export async function getDefaultValues(id: string) {
  const rows = await database
    .select({
      id: schema.questions.id,
      title: schema.questions.title,
      body: schema.questions.body,
      isAnonymous: schema.questions.isAnonymous,
      technologies: sql<
        string[]
      >`COALESCE(array_agg(DISTINCT ${schema.questionsToTechnologies.technologyId}), '{}')`,
      companies: sql<
        string[]
      >`COALESCE(array_agg(DISTINCT ${schema.questionsToCompanies.companyId}), '{}')`,
      seniorityLevels: sql<
        string[]
      >`COALESCE(array_agg(DISTINCT ${schema.questionsToSeniorityLevels.seniorityLevelId}), '{}')`,
    })
    .from(schema.questions)
    .leftJoin(
      schema.questionsToTechnologies,
      eq(schema.questionsToTechnologies.questionId, schema.questions.id),
    )
    .leftJoin(
      schema.questionsToCompanies,
      eq(schema.questionsToCompanies.questionId, schema.questions.id),
    )
    .leftJoin(
      schema.questionsToSeniorityLevels,
      eq(schema.questionsToSeniorityLevels.questionId, schema.questions.id),
    )
    .where(eq(schema.questions.id, id))
    .groupBy(schema.questions.id);

  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];

  return {
    ...row,
    technologies: row.technologies.filter(Boolean),
    companies: row.companies.filter(Boolean),
    seniorityLevels: row.seniorityLevels.filter(Boolean),
  };
}

export async function getReviews(questionId: string, userId: string) {
  const rows = await database
    .select({
      id: schema.questionReviews.id,
      status: schema.questionReviews.status,
      message: schema.questionReviews.message,
      createdAt: schema.questionReviews.createdAt,
    })
    .from(schema.questionReviews)
    .leftJoin(
      schema.questions,
      eq(schema.questionReviews.questionId, schema.questions.id),
    )
    .where(
      and(
        eq(schema.questionReviews.questionId, questionId),
        eq(schema.questions.userId, userId),
      ),
    )
    .orderBy(desc(schema.questionReviews.createdAt));

  return rows;
}
