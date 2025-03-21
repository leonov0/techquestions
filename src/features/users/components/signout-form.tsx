import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SignOut } from "../actions/signout";

export function SignOutForm() {
  return (
    <form action={SignOut}>
      <Button variant="destructive">
        <LogOut />
        <span className="ml-2">Sign out</span>
      </Button>
    </form>
  );
}
