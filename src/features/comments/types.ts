import { z } from "zod";

import { commentSchema } from "./schemas";

export type CommentPayload = z.infer<typeof commentSchema>;

export type Comment = {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  author: {
    id: string;
    username: string;
    image: string | null;
  };
};
