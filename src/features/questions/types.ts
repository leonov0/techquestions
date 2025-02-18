import { z } from "zod";

import { getQuestionSchema } from "./schemas";

export type GetQuestionPayload = z.infer<typeof getQuestionSchema>;

export type Technology = { id: string; name: string };

export type Company = { id: string; name: string };

export type Level = { id: string; name: string };

type Author = {
  id: string;
  username: string;
  image: string | null;
};

type BaseQuestion = {
  id: string;
  title: string;
  body: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  technologies: Technology[];
  companies: Company[];
  levels: Level[];
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
