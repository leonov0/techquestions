import { z } from "zod";

import { User } from "@/database";

import { getQuestionSchema } from "./schemas";

export type GetQuestionPayload = z.infer<typeof getQuestionSchema>;

type Category = { id: string; name: string };

export type Question = {
  id: string;
  title: string;
  body: string | null;
  isAnonymous: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  technologies: Category[];
  companies: Category[];
  levels: Category[];
  author: User | null;
};
