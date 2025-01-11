import { and, asc, eq, SQL } from "drizzle-orm";

import { database, schema } from "@/database";

import type { FullQuestion } from "./types";

export async function getQuestions({
  filters,
  orderBy,
  limit = 10,
}: {
  filters?: SQL[];
  orderBy?: SQL;
  limit?: number;
}): Promise<FullQuestion[]> {
  const questionsQuery = database
    .select()
    .from(schema.questions)
    .limit(limit)
    .as("questionsQuery");

  const result = await database
    .select({
      question: schema.questions,
      company: schema.companies,
      level: schema.levels,
      technology: schema.technologies,
      author: schema.users,
    })
    .from(questionsQuery)
    .leftJoin(schema.questions, eq(questionsQuery.id, schema.questions.id))
    .leftJoin(
      schema.questionsToCompanies,
      eq(schema.questionsToCompanies.questionId, schema.questions.id),
    )
    .leftJoin(
      schema.companies,
      eq(schema.questionsToCompanies.companyId, schema.companies.id),
    )
    .leftJoin(
      schema.questionsToLevels,
      eq(schema.questionsToLevels.questionId, schema.questions.id),
    )
    .leftJoin(
      schema.levels,
      eq(schema.questionsToLevels.levelId, schema.levels.id),
    )
    .leftJoin(
      schema.questionsToTechnologies,
      eq(schema.questionsToTechnologies.questionId, schema.questions.id),
    )
    .leftJoin(
      schema.technologies,
      eq(schema.questionsToTechnologies.technologyId, schema.technologies.id),
    )
    .leftJoin(schema.users, eq(schema.questions.userId, schema.users.id))
    .orderBy(orderBy ? orderBy : asc(schema.questions.createdAt))
    .where(filters ? and(...filters) : undefined);

  const questionsMap: Map<string, FullQuestion> = new Map();

  result.forEach((row) => {
    if (row.question === null) {
      throw new Error("Question not found");
    }

    const questionId = row.question.id;

    if (!questionsMap.has(questionId)) {
      const author =
        row.author && !row.question.isAnonymous
          ? {
              id: row.author.id,
              username: row.author.username,
              image: row.author.image,
            }
          : null;

      questionsMap.set(questionId, {
        ...row.question,
        companies: [],
        levels: [],
        technologies: [],
        author,
        userId: row.question.isAnonymous ? null : row.question.userId,
      });
    }

    const questionEntry = questionsMap.get(questionId)!;

    if (
      row.company &&
      !questionEntry.companies.some((c) => c.id === row.company?.id)
    ) {
      questionEntry.companies.push(row.company);
    }

    if (
      row.level &&
      !questionEntry.levels.some((l) => l.id === row.level?.id)
    ) {
      questionEntry.levels.push(row.level);
    }

    if (
      row.technology &&
      !questionEntry.technologies.some((t) => t.id === row.technology?.id)
    ) {
      questionEntry.technologies.push(row.technology);
    }
  });

  return Array.from(questionsMap.values());
}

export async function getCategories() {
  const [companyList, levelList, technologyList] = await Promise.all([
    database.select().from(schema.companies),
    database.select().from(schema.levels),
    database.select().from(schema.technologies),
  ]);

  return {
    companies: companyList,
    levels: levelList,
    technologies: technologyList,
  };
}
