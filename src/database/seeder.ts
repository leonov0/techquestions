import "dotenv/config";

import { reset, seed } from "drizzle-seed";

import { database, schema } from ".";

const technologies = [
  "JavaScript",
  "TypeScript",
  "C#",
  "Java",
  "Python",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Go",
  "Scala",
  "Rust",
  "Dart",
];

const companies = [
  "Google",
  "Facebook",
  "Amazon",
  "Apple",
  "Microsoft",
  "Netflix",
  "Airbnb",
  "Uber",
  "Lyft",
  "Slack",
  "Twitter",
  "Pinterest",
  "Dropbox",
  "Shopify",
  "Salesforce",
  "LinkedIn",
  "Square",
  "Snapchat",
  "Zoom",
  "Stripe",
];

const levels = ["Junior", "Mid-Level", "Senior", "Lead", "Manager", "Director"];

async function main() {
  await reset(database, schema);

  await seed(database, {
    users: schema.users,
    questions: schema.questions,
    questionVotes: schema.questionVotes,
    questionsToCompanies: schema.questionsToCompanies,
    questionsToTechnologies: schema.questionsToTechnologies,
    questionsToLevels: schema.questionsToLevels,
    companies: schema.companies,
    technologies: schema.technologies,
    questionReviews: schema.questionReviews,
    levels: schema.levels,
  }).refine((f) => ({
    companies: {
      columns: {
        name: f.valuesFromArray({
          values: companies,
          isUnique: true,
        }),
      },
      count: 20,
    },
    technologies: {
      columns: {
        name: f.valuesFromArray({
          values: technologies,
          isUnique: true,
        }),
      },
      count: 13,
    },
    levels: {
      columns: {
        name: f.valuesFromArray({
          values: levels,
          isUnique: true,
        }),
      },
      count: 6,
    },
    questionVotes: {
      columns: {
        vote: f.valuesFromArray({
          values: [1, -1],
        }),
      },
    },
    questions: {
      columns: {
        title: f.loremIpsum(),
        status: f.valuesFromArray({
          values: ["pending", "approved", "rejected"],
        }),
        body: f.loremIpsum({ sentencesCount: 5 }),
      },
      count: 20,
      with: {
        questionsToCompanies: 1,
        questionsToTechnologies: 1,
        questionsToLevels: 1,
        questionVotes: 1,
      },
    },
  }));
}

main();
