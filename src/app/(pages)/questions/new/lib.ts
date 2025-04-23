import { revalidateTag } from "next/cache";

import { database, NewQuestion, schema } from "@/database";

export async function createQuestion({
  value,
  technologies,
  companies,
  seniorityLevels,
}: {
  value: NewQuestion;
  technologies: string[];
  companies: string[];
  seniorityLevels: string[];
}) {
  revalidateTag("pending-questions");

  const [{ questionId }] = await database
    .insert(schema.questions)
    .values(value)
    .returning({ questionId: schema.questions.id });

  const promises = [];

  if (technologies.length) {
    promises.push(
      database.insert(schema.questionsToTechnologies).values(
        technologies.map((technologyId) => ({
          questionId,
          technologyId,
        })),
      ),
    );
  }

  if (companies.length) {
    promises.push(
      database.insert(schema.questionsToCompanies).values(
        companies.map((companyId) => ({
          questionId,
          companyId,
        })),
      ),
    );
  }

  if (seniorityLevels.length) {
    promises.push(
      database.insert(schema.questionsToSeniorityLevels).values(
        seniorityLevels.map((seniorityLevelId) => ({
          questionId,
          seniorityLevelId,
        })),
      ),
    );
  }

  await Promise.all(promises);
}
