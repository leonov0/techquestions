import { ModerateLevelSection } from "@/features/categories";

export default async function SeniorityLevel({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <ModerateLevelSection params={params} />
    </div>
  );
}
