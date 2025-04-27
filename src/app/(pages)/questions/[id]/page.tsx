import { Suspense } from "react";

import { QuestionSection } from "@/widgets/question-section";
import { QuestionSectionSkeleton } from "@/widgets/question-section-skeleton";

export default async function Question({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container">
      <Suspense fallback={<QuestionSectionSkeleton />}>
        <QuestionSection params={params} className="motion-preset-focus" />
      </Suspense>
    </main>
  );
}
