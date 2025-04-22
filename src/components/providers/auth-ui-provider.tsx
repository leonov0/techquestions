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
      providers={["google", "github"]}
      uploadAvatar={uploadAvatar}
      emailVerification
      forgotPassword
      multiSession
      optimistic
      deleteUser
      magicLink
      username
      avatar
    >
      {children}
    </Provider>
  );
}

async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch("/api/upload-avatar", {
    method: "POST",
    body: formData,
  });

  const { data } = await res.json();
  return data.url;
}
