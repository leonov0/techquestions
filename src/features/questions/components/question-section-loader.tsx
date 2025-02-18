import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function QuestionSectionLoader() {
  return (
    <section>
      <Skeleton className="h-9 w-full" />

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-6 w-56" />
      </div>

      {
        <ul className="mt-4 flex flex-wrap gap-2">
          {[...new Array(5)].map((_, index) => (
            <Skeleton key={`badge-skeleton-${index}`} className="h-6 w-16" />
          ))}
        </ul>
      }

      <Skeleton className="mt-4 h-10 w-56" />

      <Separator className="my-8" />

      <Skeleton className="h-64 w-full" />
    </section>
  );
}
