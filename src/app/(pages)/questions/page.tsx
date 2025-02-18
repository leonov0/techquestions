import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  QuestionFilters,
  QuestionFiltersLoader,
  QuestionList,
  QuestionListLoader,
} from "@/features/questions";

export default async function Questions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container py-16">
        <Suspense fallback={<QuestionFiltersLoader />}>
          <QuestionFilters />
        </Suspense>

        <div className="mx-auto mt-8 max-w-screen-md">
          <Suspense fallback={<QuestionListLoader />}>
            <QuestionList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
