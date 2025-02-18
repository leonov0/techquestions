import { Skeleton } from "@/components/ui/skeleton";

export function QuestionFiltersLoader() {
  return (
    <ul className="grid gap-4 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <li key={`question-filter-loader-${index}`}>
          <Skeleton className="h-9" />
        </li>
      ))}

      <Skeleton className="h-9 lg:col-start-4" />
    </ul>
  );
}
