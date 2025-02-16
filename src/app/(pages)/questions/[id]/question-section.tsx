import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getQuestion } from "@/features/get-question";
import { getVote, VoteButtons } from "@/features/voting";
import { getCapitalizedFirstLetter } from "@/lib/utils";

export async function QuestionSection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: question } = await getQuestion(id);

  const currentVote = await getVote(id);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(1000);

  if (!question) {
    return notFound();
  }

  return (
    <section>
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

      <ul className="mt-4 flex flex-wrap gap-2">
        {question.technologies.map(({ id, name }) => (
          <Badge key={`technology-${id}`}>{name}</Badge>
        ))}

        {question.companies.map(({ id, name }) => (
          <Badge key={`company-${id}`} variant="secondary">
            {name}
          </Badge>
        ))}

        {question.levels.map(({ id, name }) => (
          <Badge key={`level-${id}`} variant="outline">
            {name}
          </Badge>
        ))}
      </ul>

      <div className="mt-4 flex items-start gap-4">
        <VoteButtons
          questionId={id}
          rating={question.rating}
          currentVote={currentVote}
        />

        {question.author && (
          <Link
            href={`users/${question.author.username}`}
            className="group flex gap-2"
          >
            <Avatar>
              {question.author.image && (
                <AvatarImage src={question.author.image} />
              )}

              <AvatarFallback>
                {question.author.username &&
                  getCapitalizedFirstLetter(question.author.username)}
              </AvatarFallback>
            </Avatar>

            <p className="transition-colors group-hover:text-primary">
              @{question.author.username}
            </p>
          </Link>
        )}
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-[auto,_1fr] gap-4">
        <p className="text-lg">{question.body}</p>
      </div>
    </section>
  );
}
