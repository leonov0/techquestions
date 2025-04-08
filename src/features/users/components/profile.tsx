import { AlertCircle, ArrowBigUpDash, Flame, Search, User } from "lucide-react";
import Form from "next/form";
import { notFound, redirect } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionPagination } from "@/features/questions/components/pagination";
import { getCapitalizedFirstLetter } from "@/lib/utils";
import { QuestionPreview } from "@/widgets/question-preview";

import { getQuestionsByUserId } from "../actions/get-questions-by-user-id";
import { getUserByUsername } from "../actions/get-user-by-username";
import { getUserQuestionsSchema } from "../schemas";

export async function Profile({
  params,
  searchParams,
  className,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  className?: string;
}) {
  const { id: username } = await params;

  const parsedSearchParams = await getUserQuestionsSchema.safeParseAsync(
    await searchParams,
  );

  if (!parsedSearchParams.success) {
    redirect(`/users/${username}`);
  }

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

  const getQuestionsResponse = await getQuestionsByUserId(
    response.data.id,
    parsedSearchParams.data,
  );

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

      <section className="mt-16 space-y-8">
        <Form action={`/users/${username}`} className="flex gap-2">
          <Select name="orderBy" defaultValue={parsedSearchParams.data.orderBy}>
            <SelectTrigger className="w-42">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">
                <Flame />
                New
              </SelectItem>
              <SelectItem value="top">
                <ArrowBigUpDash />
                Top
              </SelectItem>
              <SelectItem value="relevance">
                <User />
                Relevance
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="secondary" size="icon">
            <Search />
          </Button>
        </Form>

        {getQuestionsResponse.success ? (
          getQuestionsResponse.data.questions.length > 0 ? (
            <>
              <ul className="space-y-4">
                {getQuestionsResponse.data.questions.map((question) => (
                  <li
                    key={question.id}
                    className="border-t pt-4 first:border-none first:pt-0"
                  >
                    <QuestionPreview
                      question={question}
                      className="motion-preset-focus"
                    />
                  </li>
                ))}
              </ul>

              <QuestionPagination
                pageCount={getQuestionsResponse.data.pageCount}
              />
            </>
          ) : (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>
                No questions found for{" "}
                <span className="font-medium">@{response.data.username}</span>.
              </AlertTitle>
            </Alert>
          )
        ) : (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>
              An error occurred while fetching the questions.
            </AlertTitle>
            <AlertDescription>{getQuestionsResponse.error}</AlertDescription>
          </Alert>
        )}
      </section>
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

      <section className="mt-16 space-y-8">
        <Skeleton className="h-9 w-53" />

        <ul>
          <li className="border-t pt-4 first:border-none first:pt-0">
            <Skeleton className="h-40" />
          </li>
          <li className="border-t pt-4 first:border-none first:pt-0">
            <Skeleton className="h-40" />
          </li>
          <li className="border-t pt-4 first:border-none first:pt-0">
            <Skeleton className="h-40" />
          </li>
        </ul>

        <Skeleton className="mx-auto h-9 max-w-[19rem]" />
      </section>
    </>
  );
}
