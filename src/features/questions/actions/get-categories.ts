"use server";

import type { Company, Level, Technology } from "@/database";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib";

export async function getCategories(): Promise<
  ActionResponse<{
    technologies: Technology[];
    companies: Company[];
    levels: Level[];
  }>
> {
  try {
    const [technologies, companies, levels] = await Promise.all([
      lib.getTechnologies(),
      lib.getCompanies(),
      lib.getLevels(),
    ]);

    return {
      success: true,
      data: {
        technologies,
        companies,
        levels,
      },
    };
  } catch {
    return {
      success: false,
      error: "Failed to get categories. Please try again later.",
    };
  }
}
