import { UpdateTechnology } from "@/features/categories";

export default async function Technology({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-xl">
      <UpdateTechnology id={id} />
    </div>
  );
}
