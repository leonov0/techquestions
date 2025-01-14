import { CrossCircledIcon } from "@radix-ui/react-icons";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getQuestion } from "@/features/get-question";

export default async function Question({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await getQuestion(id);

  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container py-16">
        {error && (
          <Alert variant="destructive">
            <CrossCircledIcon />

            <AlertTitle>
              An error occurred while fetching the questions.
            </AlertTitle>

            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {data && (
          <div>
            <h1 className="text-3xl font-bold">{data.title}</h1>

            <p className="mt-4 text-lg">{data.body}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
