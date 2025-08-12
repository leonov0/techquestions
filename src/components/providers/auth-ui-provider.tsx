"use client";

import { AuthUIProvider as Provider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export function AuthUIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Provider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={router.refresh}
      Link={Link}
      credentials={{ username: true }}
      deleteUser
      emailVerification
      magicLink
      multiSession
      settings
      social={{ providers: ["google", "github"] }}
    >
      {children}
    </Provider>
  );
}
