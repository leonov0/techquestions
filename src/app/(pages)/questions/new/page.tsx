import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SubmitQuestionForm } from "@/features/add-question";
import { getCategories } from "@/features/questions";

export default async function SubmitQuestion() {
  const {
    data: { technologies, companies, levels },
  } = await getCategories();

  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container max-w-screen-sm py-16">
        <SubmitQuestionForm
          technologies={technologies}
          companies={companies}
          levels={levels}
        />
      </main>

      <Footer />
    </div>
  );
}
