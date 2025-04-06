import { AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getCapitalizedFirstLetter } from "@/lib/utils";
import { QuestionPreview } from "@/widgets/question-preview";

import { getQuestionsByUserId } from "../actions/get-questions-by-user-id";
import { getUserByUsername } from "../actions/get-user-by-username";

export async function Profile({
  params,
  className,
}: {
  params: Promise<{ id: string }>;
  className?: string;
}) {
  const { id: username } = await params;

  const response = await getUserByUsername(username);

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>An error occurred while fetching the user.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  if (response.data === null) {
    notFound();
  }

  const getQuestionsResponse = await getQuestionsByUserId(response.data.id);

  return (
    <div className={className}>
      <section className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={response.data.image ?? undefined}></AvatarImage>
          <AvatarFallback>
            {response.data.username &&
              getCapitalizedFirstLetter(response.data.username)}
          </AvatarFallback>
        </Avatar>

        <div className="overflow-hidden">
          <p className="text-3xl leading-none font-medium tracking-tight">
            {response.data.name}
          </p>

          <h1 className="text-muted-foreground text-lg">
            @{response.data.username}
          </h1>
        </div>
      </section>

      <Separator className="my-8" />

      {getQuestionsResponse.success ? (
        getQuestionsResponse.data.questions.length > 0 ? (
          <ul className="grid gap-4">
            {getQuestionsResponse.data.questions.map((question) => (
              <li key={question.id}>
                <QuestionPreview question={question} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center">
            No questions found.
          </p>
        )
      ) : (
        <Alert variant="destructive" className="mt-8">
          <AlertCircle />
          <AlertTitle>
            An error occurred while fetching the questions.
          </AlertTitle>
          <AlertDescription>{getQuestionsResponse.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export function ProfileLoader() {
  return (
    <>
      <section className="flex items-center gap-4">
        <div>
          <Skeleton className="size-16 rounded-full" />
        </div>

        <div>
          <Skeleton className="h-7 w-64" />
          <Skeleton className="mt-1 h-6.5 w-56" />
        </div>
      </section>

      <Separator className="my-8" />

      <ul className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <li key={`question-loader-${index}`}>
            <Skeleton className="h-40" />
          </li>
        ))}
      </ul>
    </>
  );
}
