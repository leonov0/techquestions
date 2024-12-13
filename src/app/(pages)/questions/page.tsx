import { CrossCircledIcon } from "@radix-ui/react-icons";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getCategories,
  getQuestions,
  QuestionFilterForm,
  QuestionList,
} from "@/features/questions";

export default async function Questions(params: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParams = await params.searchParams;

  const getQuestionsResponse = await getQuestions({
    technologyId: searchParams?.technologyId,
    companyId: searchParams?.companyId,
    levelId: searchParams?.levelId,
    query: searchParams?.query,
  });

  const categories = await getCategories();

  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container py-16">
        <QuestionFilterForm
          technologies={categories.technologies}
          companies={categories.companies}
          levels={categories.levels}
        />

        <section className="mx-auto mt-8 max-w-screen-md">
          {getQuestionsResponse.error && (
            <Alert variant="destructive">
              <CrossCircledIcon />

              <AlertTitle>
                An error occurred while fetching the questions.
              </AlertTitle>

              <AlertDescription>
                {getQuestionsResponse.error.message}
              </AlertDescription>
            </Alert>
          )}

          <QuestionList questions={getQuestionsResponse.data} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
