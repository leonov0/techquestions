import { z } from "zod";

import type { Company, Level, Question, Technology } from "@/database";

import { getQuestionSchema } from "./schemas";

export type FullQuestion = Question & {
  companies: Company[];
  levels: Level[];
  technologies: Technology[];
  author: { id: string; username: string | null; image: string | null } | null;
};

export type GetQuestionPayload = z.infer<typeof getQuestionSchema> & {
  page?: number;
  limit?: number;
};
