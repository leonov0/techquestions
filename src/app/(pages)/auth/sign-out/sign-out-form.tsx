"use client";

import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignOutForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function signOut() {
    startTransition(async () => {
      const response = await authClient.signOut();

      if (response.error) {
        toast.error("Failed to sign out. Please try again later.");
        return;
      }

      router.push("/");
      router.refresh();
    });
  }

  return (
    <form action={signOut}>
      <Button className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
        Sign Out
      </Button>
    </form>
  );
}
