import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { parseToStringArray } from "@/lib/utils";

import { getQuestions } from "../actions";
import { getQuestionSchema } from "../schemas";
import { QuestionPagination } from "./pagination";
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

  const { data, error } = await getQuestions(parsedParams.data);

  return (
    <>
      <div className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />

            <AlertTitle>
              An error occurred while fetching the questions.
            </AlertTitle>

            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ul className="space-y-4">
          {data.questions.map((question) => (
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
        pageCount={data.pageCount}
        className="lg:col-span-2 xl:col-span-3"
      />
    </>
  );
}
