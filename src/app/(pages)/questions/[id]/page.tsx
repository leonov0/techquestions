import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { QuestionSection, QuestionSectionLoader } from "@/features/questions";

export default async function Question({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container py-16">
        <Suspense fallback={<QuestionSectionLoader />}>
          <QuestionSection params={params} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
