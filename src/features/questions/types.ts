import { z } from "zod";

import type { Question as QuestionModel } from "@/database";

import { getQuestionSchema } from "./schemas";

export type GetQuestionPayload = z.infer<typeof getQuestionSchema>;

export type Technology = { id: string; name: string };

export type Company = { id: string; name: string };

export type SeniorityLevel = { id: string; name: string };

type Author = {
  id: string;
  username: string;
  image: string | null;
};

type BaseQuestion = {
  id: string;
  title: string;
  body: string | null;
  status: QuestionModel["status"];
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  technologies: Technology[];
  companies: Company[];
  seniorityLevels: SeniorityLevel[];
};

type AnonymousQuestion = BaseQuestion & {
  isAnonymous: true;
  author: null;
};

type AuthoredQuestion = BaseQuestion & {
  isAnonymous: false;
  author: Author;
};

export type Question = AnonymousQuestion | AuthoredQuestion;
