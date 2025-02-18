import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getQuestions } from "../actions";
import { QuestionPagination } from "./pagination";
import { QuestionPreview } from "./question-preview";

export async function QuestionList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { data, error } = await getQuestions(await searchParams);

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
