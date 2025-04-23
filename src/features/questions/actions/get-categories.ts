"use server";

import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib";
import { Company, SeniorityLevel, Technology } from "../types";

export async function getCategories(): Promise<
  ActionResponse<{
    technologies: Technology[];
    companies: Company[];
    seniorityLevels: SeniorityLevel[];
  }>
> {
  try {
    const [technologies, companies, seniorityLevels] = await Promise.all([
      lib.getTechnologies(),
      lib.getCompanies(),
      lib.getLevels(),
    ]);

    return {
      success: true,
      data: {
        technologies,
        companies,
        seniorityLevels,
      },
    };
  } catch {
    return {
      success: false,
      error: "Failed to get categories. Please try again later.",
    };
  }
}
