import Link from "next/link";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getVote, VoteButtons } from "@/features/voting";
import { cn, getCapitalizedFirstLetter } from "@/lib/utils";

import type { Question } from "../types";
import { CategoryList } from "./category-list";

export async function QuestionPreview({
  question,
  className,
}: {
  question: Question;
  className?: string;
}) {
  const { data: currentVote, error } = await getVote(question.id);

  if (error) {
    toast.error(error);
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <h3>
        <Link
          href={`/questions/${question.id}`}
          className="line-clamp-1 text-lg font-medium text-primary underline-offset-4 hover:underline"
        >
          {question.title}
        </Link>
      </h3>

      <p className="line-clamp-2 text-sm">{question.body}</p>

      <CategoryList {...question} className="mt-4 flex-grow" />

      <div className="mt-4 flex gap-4">
        <VoteButtons
          questionId={question.id}
          rating={question.rating}
          currentVote={currentVote}
        />

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

            <div className="text-sm">
              <p className="transition-colors group-hover:text-primary">
                @{question.author.username}
              </p>

              <p className="text-muted-foreground">
                {question.updatedAt.toLocaleDateString("en-GB")}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Avatar>
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
