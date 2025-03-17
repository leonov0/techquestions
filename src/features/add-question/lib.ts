import { database, NewQuestion, schema } from "@/database";

export async function createQuestion({
  value,
  technologies,
  companies,
  levels,
}: {
  value: NewQuestion;
  technologies: string[];
  companies: string[];
  levels: string[];
}) {
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

  if (levels.length) {
    promises.push(
      database.insert(schema.questionsToLevels).values(
        levels.map((levelId) => ({
          questionId,
          levelId,
        })),
      ),
    );
  }

  await Promise.all(promises);
}
