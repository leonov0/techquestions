import { getCreatedQuestionsCount } from "./actions";
import { StatisticsChart } from "./statistics-chart";

export default async function Statistics() {
  const data = await getCreatedQuestionsCount();

  return (
    <main>
      <StatisticsChart data={data} />
    </main>
  );
}
