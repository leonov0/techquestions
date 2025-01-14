import { eq } from "drizzle-orm";

import {
  type Company,
  database,
  type Level,
  schema,
  type Technology,
} from "@/database";
import type { FullQuestion } from "@/features/questions";

export async function getQuestion(id: string): Promise<FullQuestion> {
  const getQuestionQuery = database
    .select({ id: schema.questions.id })
    .from(schema.questions)
    .where(eq(schema.questions.id, id))
    .limit(1)
    .as("getQuestionQuery");

  const rows = await database
    .select({
      question: schema.questions,
      author: schema.users,
      technology: schema.technologies,
      company: schema.companies,
      level: schema.levels,
    })
    .from(getQuestionQuery)
    .leftJoin(schema.questions, eq(getQuestionQuery.id, schema.questions.id))
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
    );

  if (rows.length === 0 || !rows[0].question) {
    throw new Error("Question not found");
  }

  const question = rows[0].question;

  const tags = rows.reduce(
    (acc, row) => {
      if (row.technology) {
        acc.technologies.set(row.technology.id, row.technology);
      }

      if (row.company) {
        acc.companies.set(row.company.id, row.company);
      }

      if (row.level) {
        acc.levels.set(row.level.id, row.level);
      }

      return acc;
    },
    {
      technologies: new Map<string, Technology>(),
      companies: new Map<string, Company>(),
      levels: new Map<string, Level>(),
    },
  );

  const author =
    question.isAnonymous || !rows[0].author
      ? null
      : {
          id: rows[0].author.id,
          username: rows[0].author.username,
          image: rows[0].author.image,
        };

  return {
    ...question,
    author,
    technologies: Array.from(tags.technologies.values()),
    companies: Array.from(tags.companies.values()),
    levels: Array.from(tags.levels.values()),
  };
}
