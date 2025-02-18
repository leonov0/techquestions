import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getFeaturedQuestions } from "../actions";
import { QuestionPreview } from "./question-preview";

export async function FeaturedQuestionList() {
  const { data: questions, error } = await getFeaturedQuestions({ limit: 3 });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />

        <AlertTitle>An error occurred while fetching the questions.</AlertTitle>

        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {questions.map((question) => (
        <li key={question.id}>
          <QuestionPreview
            question={question}
            className="motion-preset-focus h-full rounded-xl border bg-card p-6 text-card-foreground shadow"
          />
        </li>
      ))}
    </ul>
  );
}
