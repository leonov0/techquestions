import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeaturedQuestions } from "@/features/questions/actions";

import { QuestionPreview } from "./question-preview";

export async function FeaturedQuestionList() {
  const response = await getFeaturedQuestions();

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />

        <AlertTitle>An error occurred while fetching the questions.</AlertTitle>

        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  if (response.data.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />

        <AlertTitle>No questions found.</AlertTitle>

        <AlertDescription>
          There are no questions available at the moment.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {response.data.map((question) => (
        <li key={question.id}>
          <QuestionPreview
            question={question}
            className="motion-preset-focus bg-card text-card-foreground h-full rounded-xl border p-6 shadow-sm"
          />
        </li>
      ))}
    </ul>
  );
}

export function FeaturedQuestionListLoader() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {[...new Array(3)].map((_, index) => (
        <Skeleton
          key={`featured-question-loader-${index}`}
          className="h-60 rounded-xl"
        />
      ))}
    </ul>
  );
}
