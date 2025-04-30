import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { EditQuestionSection } from "./edit-question-section";

export default async function EditQuestion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container max-w-xl">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <EditQuestionSection params={params} />
      </Suspense>
    </main>
  );
}
