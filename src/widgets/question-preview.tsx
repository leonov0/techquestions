import Link from "next/link";
import { Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Question } from "@/features/questions";
import { Rating, RatingLoader } from "@/features/rating";
import { cn, getCapitalizedFirstLetter } from "@/lib/utils";

import { CategoryList } from "./category-list";

export async function QuestionPreview({
  question,
  className,
}: {
  question: Question;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h3>
        <Link
          href={`/questions/${question.id}`}
          className="text-primary line-clamp-1 text-lg font-medium underline-offset-4 hover:underline"
        >
          {question.title}
        </Link>
      </h3>

      <p className="line-clamp-2 text-sm">{question.body}</p>

      <div className="mt-4 grow">
        <CategoryList {...question} />
      </div>

      <div className="mt-4 flex gap-4">
        <Suspense fallback={<RatingLoader rating={question.rating} />}>
          <Rating questionId={question.id} />
        </Suspense>

        {question.author ? (
          <Link
            href={`users/${question.author.username}`}
            className="group flex gap-2"
          >
            <Avatar className="size-10">
              {question.author.image && (
                <AvatarImage src={question.author.image} />
              )}

              <AvatarFallback>
                {getCapitalizedFirstLetter(question.author.username)}
              </AvatarFallback>
            </Avatar>

            <div className="text-sm">
              <p className="group-hover:text-primary transition-colors">
                @{question.author.username}
              </p>

              <p className="text-muted-foreground">
                {question.updatedAt.toLocaleDateString("en-GB")}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Avatar className="size-10">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <div className="text-sm">
              <p>Anonymous</p>

              <p className="text-muted-foreground">
                {question.createdAt.toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
