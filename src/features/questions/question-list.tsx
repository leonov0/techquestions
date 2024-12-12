import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCapitalizedFirstLetter } from "@/lib/utils";

import type { FullQuestion } from "./types";

export function QuestionList({ questions }: { questions: FullQuestion[] }) {
  return (
    <ul>
      {questions.map((question) => (
        <li key={question.id} className="border-t p-4 first:border-none">
          <h3>
            <Link
              href={`/questions/${question.id}`}
              className="text-lg font-medium text-primary underline-offset-4 hover:underline"
            >
              {question.title}
            </Link>
          </h3>

          <p className="line-clamp-2 text-sm">{question.body}</p>

          <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
            {question.technologies.map((technology) => (
              <li key={`technology-${question.id}-${technology.id}`}>
                <Badge>{technology.name}</Badge>
              </li>
            ))}

            {question.companies.map((company) => (
              <li key={`company-${question.id}-${company.id}`}>
                <Badge variant="secondary">{company.name}</Badge>
              </li>
            ))}

            {question.levels.map((level) => (
              <li key={`level-${question.id}-${level.id}`}>
                <Badge variant="outline">{level.name}</Badge>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex">
            {question.isAnonymous || !question.author?.username ? (
              <div className="inline-flex gap-2">
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
            ) : (
              <Link
                href={`users/${question.author.username}`}
                className="group flex gap-2"
              >
                <Avatar>
                  <AvatarImage src={question.author.image ?? undefined} />

                  <AvatarFallback>
                    {question.author.username &&
                      getCapitalizedFirstLetter(question.author.username)}
                  </AvatarFallback>
                </Avatar>

                <div className="text-sm">
                  <p className="transition-colors group-hover:text-primary">
                    @{question.author.username}
                  </p>
                  <p className="text-muted-foreground">
                    {question.createdAt.toLocaleDateString("en-GB")}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
