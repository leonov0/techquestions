import Link from "next/link";
import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { buttonVariants } from "@/components/ui/button";
import {
  QuestionFilters,
  QuestionFiltersLoader,
  QuestionList,
  QuestionListLoader,
} from "@/features/questions";
import { cn } from "@/lib/utils";

export default async function Questions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container grid gap-8 py-16 lg:grid-cols-[18rem,_1fr] xl:grid-cols-[18rem,_1fr,_18rem]">
        <aside className="space-y-4">
          <Link
            href="/questions/new"
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Submit new question
          </Link>

          <Suspense fallback={<QuestionFiltersLoader />}>
            <QuestionFilters />
          </Suspense>
        </aside>

        <Suspense fallback={<QuestionListLoader />}>
          <QuestionList searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
