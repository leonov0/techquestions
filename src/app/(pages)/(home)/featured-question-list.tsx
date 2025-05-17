import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QuestionPreview } from "@/widgets/question-preview";

import { getFeaturedQuestions } from "./actions";

export async function FeaturedQuestionList() {
  const response = await getFeaturedQuestions();

  if (!response.success || response.data.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>No questions found</AlertTitle>
        <AlertDescription>
          There are no questions available at the moment. Please check back
          later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {response.data.map((question) => (
        <li key={question.id}>
          <QuestionPreview
            {...question}
            className="motion-preset-focus bg-card text-card-foreground h-full rounded-xl border p-6 shadow-sm"
          />
        </li>
      ))}
    </ul>
  );
}
