import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { QuestionList, QuestionListLoader } from "@/widgets/question-list";

import { QuestionFilters } from "./question-filters";
import { QuestionFiltersSkeleton } from "./question-filters-skeleton";

export default async function Questions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="container grid gap-8 lg:grid-cols-[18rem_1fr] xl:grid-cols-[18rem_1fr_18rem]">
      <aside className="space-y-6">
        <Button variant="secondary" className="w-full" asChild>
          <Link href="/questions/new">
            <Plus />
            Submit New Question
          </Link>
        </Button>

        <Suspense fallback={<QuestionFiltersSkeleton />}>
          <QuestionFilters />
        </Suspense>
      </aside>

      <Suspense fallback={<QuestionListLoader />}>
        <QuestionList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
