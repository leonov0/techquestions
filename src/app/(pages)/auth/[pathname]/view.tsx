"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthView({ pathname }: { pathname: string }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <main className="container">
      <AuthCard pathname={pathname} className="mx-auto" />
    </main>
  );
}
