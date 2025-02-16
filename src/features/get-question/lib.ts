import { eq, sql } from "drizzle-orm";

import { database, schema } from "@/database";

import { Question } from "./types";

export async function getQuestion(id: string): Promise<Question | null> {
  const [question] = await database
    .select({
      id: schema.questions.id,
      title: schema.questions.title,
      body: schema.questions.body,
      isAnonymous: schema.questions.isAnonymous,
      status: schema.questions.status,
      createdAt: schema.questions.createdAt,
      updatedAt: schema.questions.updatedAt,
      rating: sql<number>`COALESCE(SUM(${schema.questionVotes.vote}), 0)`,
      technologies: sql<
        [{ id: string; name: string }]
      >`json_agg(DISTINCT jsonb_build_object('id', ${schema.technologies.id}, 'name', ${schema.technologies.name}))`,
      companies: sql<
        [{ id: string; name: string }]
      >`json_agg(DISTINCT jsonb_build_object('id', ${schema.companies.id}, 'name', ${schema.companies.name}))`,
      levels: sql<
        [{ id: string; name: string }]
      >`json_agg(DISTINCT jsonb_build_object('id', ${schema.levels.id}, 'name', ${schema.levels.name}))`,
      author: sql<{
        id: string;
        username: string;
        image: string | null;
      } | null>`CASE 
        WHEN ${schema.questions.isAnonymous} OR ${schema.users.username} IS NULL THEN NULL
        ELSE jsonb_build_object(
          'id', ${schema.users.id}, 
          'username', ${schema.users.username}, 
          'image', ${schema.users.image}
        )
      END`,
    })
    .from(schema.questions)
    .leftJoin(
      schema.questionVotes,
      eq(schema.questions.id, schema.questionVotes.questionId),
    )
    .leftJoin(schema.users, eq(schema.questions.userId, schema.users.id))
    .leftJoin(
      schema.questionsToTechnologies,
      eq(schema.questions.id, schema.questionsToTechnologies.questionId),
    )
    .leftJoin(
      schema.technologies,
      eq(schema.questionsToTechnologies.technologyId, schema.technologies.id),
    )

    .leftJoin(
      schema.questionsToCompanies,
      eq(schema.questions.id, schema.questionsToCompanies.questionId),
    )
    .leftJoin(
      schema.companies,
      eq(schema.questionsToCompanies.companyId, schema.companies.id),
    )
    .leftJoin(
      schema.questionsToLevels,
      eq(schema.questions.id, schema.questionsToLevels.questionId),
    )

    .leftJoin(
      schema.levels,
      eq(schema.questionsToLevels.levelId, schema.levels.id),
    )
    .where(eq(schema.questions.id, id))
    .groupBy(schema.questions.id, schema.users.id);

  return question as Question | null;
}
