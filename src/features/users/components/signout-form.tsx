import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { signOut } from "../actions/signout";

export function SignOutForm() {
  return (
    <form action={signOut}>
      <Button variant="destructive">
        <LogOut />
        Sign out
      </Button>
    </form>
  );
}
