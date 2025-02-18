import { Skeleton } from "@/components/ui/skeleton";

export function QuestionFiltersLoader() {
  return (
    <ul className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <li key={`question-filter-loader-${index}`}>
          <Skeleton className="h-9" />
        </li>
      ))}
    </ul>
  );
}
