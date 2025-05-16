import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { QuestionSection } from "./question-section";

export default async function EditQuestion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container max-w-xl">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <QuestionSection params={params} />
      </Suspense>
    </main>
  );
}
