import { Skeleton } from "@/components/ui/skeleton";

export function QuestionListLoader() {
  return (
    <ul className="space-y-4">
      {[...Array(10)].map((_, index) => (
        <li
          key={`question-loader-${index}`}
          className="border-t pt-4 first:border-none first:pt-0"
        >
          <Skeleton className="h-[7.75rem]" />
        </li>
      ))}

      <Skeleton className="mx-auto mt-8 h-9 max-w-[19rem]"></Skeleton>
    </ul>
  );
}
