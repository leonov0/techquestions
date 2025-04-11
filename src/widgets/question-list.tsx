import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuestions } from "@/features/questions/actions";
import { QuestionPagination } from "@/features/questions/components/pagination";
import { getQuestionSchema } from "@/features/questions/schemas";
import { parseToStringArray } from "@/lib/utils";

import { QuestionPreview } from "./question-preview";

export async function QuestionList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const parsedParams = await getQuestionSchema.safeParseAsync({
    technologies: parseToStringArray(params.technologyId),
    companies: parseToStringArray(params.companyId),
    levels: parseToStringArray(params.levelId),
    ...params,
  });

  if (!parsedParams.success) {
    redirect("/questions");
  }

  const response = await getQuestions({
    ...parsedParams.data,
  });

  if (!response.success) {
    return (
      <Alert variant="destructive" className="h-fit">
        <AlertCircle className="size-4" />

        <AlertTitle>An error occurred while fetching the questions.</AlertTitle>

        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  if (response.data.questions.length === 0) {
    return (
      <Alert className="h-fit">
        <AlertCircle className="size-4" />

        <AlertTitle>No questions found.</AlertTitle>

        <AlertDescription>
          Try changing the filters or submitting a new question.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div>
        <ul className="space-y-4">
          {response.data.questions.map((question) => (
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
      </div>

      <QuestionPagination
        pageCount={response.data.pageCount}
        className="lg:col-span-2 xl:col-span-3"
      />
    </>
  );
}

export function QuestionListLoader() {
  return (
    <ul className="space-y-4">
      {[...Array(10)].map((_, index) => (
        <li
          key={`question-loader-${index}`}
          className="border-t pt-4 first:border-none first:pt-0"
        >
          <Skeleton className="h-40" />
        </li>
      ))}

      <Skeleton className="mx-auto h-9 max-w-[19rem] lg:col-span-2 xl:col-span-3" />
    </ul>
  );
}
