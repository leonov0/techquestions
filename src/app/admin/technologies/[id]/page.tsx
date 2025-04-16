import { ModerateTechnologySection } from "@/features/categories";

export default async function Technology({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <ModerateTechnologySection params={params} />
    </div>
  );
}
