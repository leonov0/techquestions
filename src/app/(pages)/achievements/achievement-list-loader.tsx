import { Skeleton } from "@/components/ui/skeleton";

export async function AchievementListLoader() {
  return (
    <ul className="space-y-4">
      <li>
        <Skeleton className="h-45 rounded-md shadow" />
      </li>
      <li>
        <Skeleton className="h-45 rounded-md shadow" />
      </li>
      <li>
        <Skeleton className="h-45 rounded-md shadow" />
      </li>
    </ul>
  );
}
