"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCapitalizedFirstLetter } from "@/lib/utils";

import type { Comment } from "../types";

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="text-muted-foreground">No comments yet.</p>;
  }

  return (
    <ul className="space-y-8">
      {comments.map((comment) => (
        <li key={comment.id}>
          <p className="break-words">{comment.message}</p>

          <div className="mt-4 flex gap-4">
            <Link
              href={`/users/${comment.author.username}`}
              className="group flex gap-2"
            >
              <Avatar className="size-10">
                {comment.author.image && (
                  <AvatarImage src={comment.author.image} />
                )}

                <AvatarFallback>
                  {getCapitalizedFirstLetter(comment.author.username)}
                </AvatarFallback>
              </Avatar>

              <div className="text-sm">
                <p className="group-hover:text-primary transition-colors">
                  @{comment.author.username}
                </p>

                <time
                  dateTime={comment.createdAt.toString()}
                  className="text-muted-foreground"
                >
                  {comment.createdAt.toLocaleDateString()}
                </time>
              </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
