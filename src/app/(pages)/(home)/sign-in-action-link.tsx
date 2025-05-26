import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

export async function SignInActionLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return null; // User is already signed in, no action link needed
  }

  return (
    <Link href="/auth/sign-in" className={className}>
      {children}
    </Link>
  );
}
