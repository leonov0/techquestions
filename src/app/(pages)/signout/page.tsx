import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignOutForm } from "@/features/users";

export default function SignOut() {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container max-w-screen-sm py-16">
        <Card>
          <CardHeader>
            <CardTitle>Sign out of your account</CardTitle>

            <CardDescription>
              You will need to sign in again to get full access to our features.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignOutForm />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
