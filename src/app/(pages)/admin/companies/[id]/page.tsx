import { ModerateCompanySection } from "@/features/categories";

export default async function Company({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <ModerateCompanySection params={params} />
    </div>
  );
}
