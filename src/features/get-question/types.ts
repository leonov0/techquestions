type Technology = { id: string; name: string };
type Company = { id: string; name: string };
type Level = { id: string; name: string };

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
  author: {
    id: string;
    username: string;
    image: string | null;
  };
};

export type Question = AnonymousQuestion | AuthoredQuestion;
