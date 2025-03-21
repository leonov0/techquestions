import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SignInForm } from "@/features/users";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container max-w-screen-sm py-16">
        <SignInForm searchParams={searchParams} />
      </main>

      <Footer />
    </div>
  );
}
