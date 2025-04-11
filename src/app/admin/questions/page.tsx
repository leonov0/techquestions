import { Suspense } from "react";

import { QuestionList, QuestionListLoader } from "@/features/manage-questions";

export default function ManageQuestions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Manage questions
      </h1>

      <section className="mt-8">
        <Suspense fallback={<QuestionListLoader />}>
          <QuestionList searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
