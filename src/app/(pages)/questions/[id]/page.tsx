import { Suspense } from "react";

import { QuestionSection } from "@/widgets/question-section";
import { QuestionSectionSkeleton } from "@/widgets/question-section-skeleton";

export default async function Question({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="container">
      <Suspense fallback={<QuestionSectionSkeleton />}>
        <QuestionSection
          params={params}
          searchParams={searchParams}
          className="motion-preset-focus"
        />
      </Suspense>
    </main>
  );
}
