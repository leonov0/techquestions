import { and, eq, SQL } from "drizzle-orm";

import {
  companies,
  database,
  levels,
  questions,
  questionsToCompanies,
  questionsToLevels,
  questionsToTechnologies,
  technologies,
  users,
} from "@/features/database";

import type { FullQuestion } from "./types";

export async function getQuestions(filters?: SQL[]): Promise<FullQuestion[]> {
  const result = await database
    .select({
      question: questions,
      company: companies,
      level: levels,
      technology: technologies,
      author: users,
    })
    .from(questions)
    .leftJoin(
      questionsToCompanies,
      eq(questionsToCompanies.questionId, questions.id),
    )
    .leftJoin(companies, eq(questionsToCompanies.companyId, companies.id))
    .leftJoin(questionsToLevels, eq(questionsToLevels.questionId, questions.id))
    .leftJoin(levels, eq(questionsToLevels.levelId, levels.id))
    .leftJoin(
      questionsToTechnologies,
      eq(questionsToTechnologies.questionId, questions.id),
    )
    .leftJoin(
      technologies,
      eq(questionsToTechnologies.technologyId, technologies.id),
    )
    .leftJoin(users, eq(questions.userId, users.id))
    .where(filters ? and(...filters) : undefined);

  const questionsMap: Map<string, FullQuestion> = new Map();

  result.forEach((row) => {
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
    database.select().from(companies),
    database.select().from(levels),
    database.select().from(technologies),
  ]);

  return {
    companies: companyList,
    levels: levelList,
    technologies: technologyList,
  };
}
