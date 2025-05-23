import { Separator } from "@/components/ui/separator";

import { getCreatedQuestionsCount } from "./actions";
import { StatisticsChart } from "./statistics-chart";

export default async function Statistics() {
  const data = await getCreatedQuestionsCount();

  return (
    <main>
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight">
          Statistics of Questions Created
        </h1>
        <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
          There is trend of questions created over time. Statistics are updated
          momentarily after a question is created.
        </p>
      </div>

      <Separator className="my-8" />

      <StatisticsChart data={data} />
    </main>
  );
}
