import { Suspense } from "react";

import {
  QuestionSection,
  QuestionSectionLoader,
} from "@/widgets/question-section";

export default async function Question({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container py-16">
      <Suspense fallback={<QuestionSectionLoader />}>
        <QuestionSection params={params} className="motion-preset-focus" />
      </Suspense>
    </main>
  );
}
