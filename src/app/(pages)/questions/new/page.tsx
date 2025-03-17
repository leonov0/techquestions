import { AlertCircle } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitQuestionForm } from "@/features/add-question";
import { getCategories } from "@/features/questions/actions";

export default async function SubmitQuestion() {
  const { data, error } = await getCategories();

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container max-w-screen-sm space-y-8 py-16">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />

            <AlertTitle>
              An error occurred while fetching the categories.
            </AlertTitle>

            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <SubmitQuestionForm {...data} />
      </main>

      <Footer />
    </div>
  );
}
