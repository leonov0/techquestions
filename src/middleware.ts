import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

import { PROTECTED_ROUTES } from "@/lib/protected-routes";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (sessionCookie === null && isProtectedRoute) {
    const signInRedirectUrl = `/auth/sign-in?redirectTo=${request.nextUrl.href}`;

    return NextResponse.redirect(new URL(signInRedirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
