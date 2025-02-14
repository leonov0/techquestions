import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getQuestion } from "@/features/get-question";
import { getCapitalizedFirstLetter } from "@/lib/utils";

export async function QuestionSection({ id }: { id: string }) {
  const { data: question } = await getQuestion(id);

  if (!question) {
    return notFound();
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">{question.title}</h1>

      <div className="mt-4 grid flex-1 gap-x-4 gap-y-1 md:grid-cols-[auto,_1fr,_auto]">
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

        {question.author ? (
          <Link
            href={`users/${question.author.username}`}
            className="row-span-2 mt-2 flex h-fit gap-2 rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 transition-colors hover:bg-primary/20 md:mt-0"
          >
            <Avatar>
              <AvatarImage src={question.author.image ?? undefined} />

              <AvatarFallback>
                {question.author.username &&
                  getCapitalizedFirstLetter(question.author.username)}
              </AvatarFallback>
            </Avatar>

            <p>@{question.author.username}</p>
          </Link>
        ) : (
          <p className="text-muted-foreground">This question is anonymous</p>
        )}

        {(question.technologies.length > 0 ||
          question.companies.length > 0 ||
          question.levels.length > 0) && (
          <ul className="row-start-3 mt-2 flex flex-wrap gap-x-2 gap-y-1 md:col-span-2 md:row-start-2">
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
        )}
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-[auto,_1fr] gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronUpIcon />
          </Button>

          <span>0</span>

          <Button variant="outline" size="icon">
            <ChevronDownIcon />
          </Button>
        </div>

        <p className="text-lg">{question.body}</p>
      </div>
    </section>
  );
}
