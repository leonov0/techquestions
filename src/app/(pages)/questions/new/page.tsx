import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitQuestionForm } from "@/features/add-question";
import { getCategories } from "@/features/questions/actions";

export default async function SubmitQuestion() {
  const response = await getCategories();

  const categories = response.success
    ? response.data
    : {
        technologies: [],
        companies: [],
        levels: [],
      };

  return (
    <main className="container max-w-screen-sm space-y-8 py-16">
      {!response.success && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />

          <AlertTitle>
            An error occurred while fetching the categories.
          </AlertTitle>

          <AlertDescription>{response.error}</AlertDescription>
        </Alert>
      )}

      <SubmitQuestionForm {...categories} />
    </main>
  );
}
