import { UserAvatar } from "@daveyplate/better-auth-ui";
import { AlertCircle, ArrowBigUpDash, Flame, Search, User } from "lucide-react";
import Form from "next/form";
import { notFound, redirect } from "next/navigation";

import { QuestionPagination } from "@/components/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionPreview } from "@/widgets/question-preview";

import { getQuestionsByUserId } from "./get-questions-by-user-id";
import { getUserByUsername } from "./get-user-by-username";
import { getUserQuestionsSchema } from "./schemas";

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
        <UserAvatar className="size-16" user={response.data} />

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
          <Select name="order" defaultValue={parsedSearchParams.data.order}>
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
                      {...question}
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
            <Alert>
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
