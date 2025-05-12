import { AlertCircle, Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

import { getAchievements } from "./get-achievements";

export async function AchievementList() {
  const achievements = await getAchievements();

  if (achievements.success === false) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>No questions found</AlertTitle>
        <AlertDescription>
          There are no questions available at the moment. Please check back
          later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="space-y-4">
      {achievements.data.map((achievement) => (
        <li className="rounded-md border px-4 py-8 shadow" key={achievement.id}>
          <h3 className="flex items-center justify-center gap-2 font-medium">
            {achievement.completed && (
              <Check className="size-4 text-green-500" />
            )}
            {achievement.name}
          </h3>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            {achievement.description}
          </p>
          <Progress
            value={(achievement.progress / achievement.total) * 100}
            className="mt-4"
          />
          <p className="text-muted-foreground text-right text-sm">
            {achievement.progress}/{achievement.total}
          </p>
        </li>
      ))}
    </ul>
  );
}
