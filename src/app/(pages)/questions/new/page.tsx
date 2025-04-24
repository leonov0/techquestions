import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCategories } from "@/features/questions";

import { SubmitQuestionForm } from "./submit-question-form";

export default async function SubmitQuestion() {
  const response = await getCategories();

  return (
    <main className="container max-w-xl space-y-8">
      {!response.success ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>
            An error occurred while fetching the categories.
          </AlertTitle>
          <AlertDescription>{response.error}</AlertDescription>
        </Alert>
      ) : (
        <SubmitQuestionForm {...response.data} />
      )}
    </main>
  );
}
