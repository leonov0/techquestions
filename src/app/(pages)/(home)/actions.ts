"use server";

import { eq } from "drizzle-orm";

import { database, schema } from "@/database";
import type { Question } from "@/features/questions";
import { getQuestions } from "@/features/questions/lib/get-questions";
import type { ActionResponse } from "@/lib/action-response";

export async function getFeaturedQuestions(): Promise<
  ActionResponse<Question[]>
> {
  try {
    const { questions } = await getQuestions({
      countPerPage: 3,
      status: "approved",
    });

    return { success: true, data: questions };
  } catch {
    return {
      success: false,
      error: "Failed to get featured questions. Please try again later.",
    };
  }
}

export async function getPopularCategories(): Promise<
  ActionResponse<{
    categories: {
      name: string;
      href: string;
      description: string;
    }[];
  }>
> {
  "use cache";

  try {
    const [google] = await database
      .select({
        id: schema.companies.id,
      })
      .from(schema.companies)
      .where(eq(schema.companies.name, "Google"))
      .limit(1);

    const [algorithms] = await database
      .select({
        id: schema.technologies.id,
      })
      .from(schema.technologies)
      .where(eq(schema.technologies.name, "Algorithms"))
      .limit(1);

    const [junior] = await database
      .select({
        id: schema.seniorityLevels.id,
      })
      .from(schema.seniorityLevels)
      .where(eq(schema.seniorityLevels.name, "Junior"))
      .limit(1);

    if (!google || !algorithms || !junior) {
      return {
        success: false,
        error: "Failed to get popular categories. Please try again later.",
      };
    }

    const categories = [
      {
        name: "Google",
        href: `/questions?companyId=${google.id}`,
        description: "Explore questions asked by Google.",
      },
      {
        name: "Algorithms",
        href: `/questions?technologyId=${algorithms.id}`,
        description: "Explore questions related to Algorithms.",
      },
      {
        name: "Junior Developers",
        href: `/questions?seniorityLevelId=${junior.id}`,
        description: "Explore questions for Junior Developers.",
      },
    ];

    return { success: true, data: { categories } };
  } catch {
    return {
      success: false,
      error: "Failed to get popular categories. Please try again later.",
    };
  }
}
