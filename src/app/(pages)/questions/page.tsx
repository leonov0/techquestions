import Link from "next/link";
import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { buttonVariants } from "@/components/ui/button";
import { QuestionFilters, QuestionFiltersLoader } from "@/features/questions";
import { cn } from "@/lib/utils";
import { QuestionList, QuestionListLoader } from "@/widgets/question-list";

export default async function Questions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container grid gap-8 py-16 lg:grid-cols-[18rem_1fr] xl:grid-cols-[18rem_1fr_18rem]">
        <aside className="space-y-6">
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
