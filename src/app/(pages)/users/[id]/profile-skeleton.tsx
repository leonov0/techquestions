import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div>
      <section className="flex items-center gap-4">
        <div>
          <Skeleton className="size-16 rounded-full" />
        </div>

        <div>
          <Skeleton className="h-7 w-64" />
          <Skeleton className="mt-1 h-6.5 w-56" />
        </div>
      </section>

      <section className="mt-16 space-y-8">
        <Skeleton className="h-9 w-53" />

        <ul>
          <li className="border-t pt-4 first:border-none first:pt-0">
            <Skeleton className="h-40" />
          </li>
          <li className="border-t pt-4 first:border-none first:pt-0">
            <Skeleton className="h-40" />
          </li>
          <li className="border-t pt-4 first:border-none first:pt-0">
            <Skeleton className="h-40" />
          </li>
        </ul>

        <Skeleton className="mx-auto h-9 max-w-[19rem]" />
      </section>
    </div>
  );
}
