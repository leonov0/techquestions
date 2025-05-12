import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { AchievementList } from "./achievement-list";
import { AchievementListLoader } from "./achievement-list-loader";

export default async function Achievements() {
  return (
    <main className="container max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">Achievements</h1>

      <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
        Achievements are a way to reward users for their contributions to the
        community. They can be earned by completing certain tasks or reaching
        specific milestones.
      </p>

      <Separator className="my-8" />

      <section className="mt-8">
        <Suspense fallback={<AchievementListLoader />}>
          <AchievementList />
        </Suspense>
      </section>
    </main>
  );
}
