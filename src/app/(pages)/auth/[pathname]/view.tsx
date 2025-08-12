"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main className="container">
      <AuthCard pathname={pathname} className="mx-auto" />
    </main>
  );
}
