import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { signOut } from "../actions/signout";

export function SignOutForm() {
  return (
    <form action={signOut}>
      <Button variant="destructive">
        <LogOut />
        <span className="ml-2">Sign out</span>
      </Button>
    </form>
  );
}
