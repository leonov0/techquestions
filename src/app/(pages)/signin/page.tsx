import { SignInForm } from "@/features/users";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="container max-w-screen-sm py-16">
      <SignInForm searchParams={searchParams} />
    </main>
  );
}
