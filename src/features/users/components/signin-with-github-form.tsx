import { GitHub } from "@/components/icons/github";
import { Button } from "@/components/ui/button";

import { signInWithGitHub } from "../actions/signin-with-github";

export function SignInWithGitHubForm({ redirectTo }: { redirectTo?: string }) {
  const signIn = signInWithGitHub.bind(null, redirectTo);

  return (
    <form action={signIn}>
      <Button className="w-full">
        <GitHub />
        GitHub
      </Button>
    </form>
  );
}
