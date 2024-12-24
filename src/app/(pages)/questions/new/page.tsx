import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AddQuestionForm } from "@/features/questions/add-question-form";

export default function AddQuestion() {
  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container py-16">
        <AddQuestionForm />
      </main>

      <Footer />
    </div>
  );
}
