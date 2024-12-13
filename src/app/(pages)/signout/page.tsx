import { ExitIcon } from "@radix-ui/react-icons";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "@/features/auth";

export default function SignOut() {
  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
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
            <form
              action={async () => {
                "use server";

                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="destructive">
                <ExitIcon />
                <span className="ml-2">Sign out</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
