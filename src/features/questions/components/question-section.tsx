import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Rating, RatingLoader } from "@/features/rating";
import { getCapitalizedFirstLetter } from "@/lib/utils";

import { getQuestion } from "../actions";
import { CategoryList } from "./category-list";

export async function QuestionSection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: question } = await getQuestion(id);

  if (!question) {
    return notFound();
  }

  return (
    <section className="motion-preset-focus">
      <h1 className="text-3xl font-bold">{question.title}</h1>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <p>
          <span className="text-muted-foreground">Asked </span>

          <time dateTime={question.createdAt.toString()}>
            {question.createdAt.toLocaleString()}
          </time>
        </p>

        <p>
          <span className="text-muted-foreground">Modified </span>

          <time dateTime={question.updatedAt.toString()}>
            {question.updatedAt.toLocaleString()}
          </time>
        </p>
      </div>

      <CategoryList {...question} className="mt-4" />

      <div className="mt-4 flex flex-grow gap-4">
        <Suspense fallback={<RatingLoader rating={question.rating} />}>
          <Rating questionId={question.id} />
        </Suspense>

        {question.author ? (
          <Link
            href={`users/${question.author.username}`}
            className="group flex gap-2"
          >
            <Avatar>
              {question.author.image && (
                <AvatarImage src={question.author.image} />
              )}

              <AvatarFallback>
                {getCapitalizedFirstLetter(question.author.username)}
              </AvatarFallback>
            </Avatar>

            <p className="text-sm transition-colors group-hover:text-primary">
              @{question.author.username}
            </p>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Avatar>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <p className="text-sm">Anonymous</p>
          </div>
        )}
      </div>

      <Separator className="my-8" />

      <p className="text-lg">{question.body}</p>
    </section>
  );
}
