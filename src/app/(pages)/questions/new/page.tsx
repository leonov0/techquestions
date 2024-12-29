import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SubmitQuestionForm } from "@/features/add-question";

export default function SubmitQuestion() {
  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container py-16">
        <SubmitQuestionForm />
      </main>

      <Footer />
    </div>
  );
}
