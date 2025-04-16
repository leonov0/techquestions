import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";

import { signInWithGoogle } from "../actions/signin-with-google";

export function SignInWithGoogleForm({ redirectTo }: { redirectTo?: string }) {
  const signIn = signInWithGoogle.bind(null, redirectTo);

  return (
    <form action={signIn}>
      <Button className="w-full">
        <Google />
        Google
      </Button>
    </form>
  );
}
