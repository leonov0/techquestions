import { Suspense } from "react";

import { ManageQuestionsSection } from "@/features/manage-questions";

export default async function ManageQuestions() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Manage pending questions
      </h1>

      <section className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ManageQuestionsSection />
        </Suspense>
      </section>
    </div>
  );
}
