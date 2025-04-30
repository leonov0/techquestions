import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Questions } from "./questions";

export default function Reviews() {
  return (
    <main className="mx-auto w-full max-w-[calc(100vw-2rem)] sm:container">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Questions />
      </Suspense>
    </main>
  );
}
