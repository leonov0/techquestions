import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import Loading from "./loading";
import { QuestionSection } from "./question-section";

export default async function Question({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container py-16">
        <Suspense fallback={<Loading />}>
          <QuestionSection params={params} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
