import { Suspense } from "react";

import { ReviewQuestionSection } from "@/features/review-questions";

export default async function ReviewQuestions() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Review questions
      </h1>

      <section className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewQuestionSection />
        </Suspense>
      </section>
    </div>
  );
}
