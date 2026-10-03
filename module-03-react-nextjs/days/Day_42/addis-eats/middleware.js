import { NextResponse } from "next/server";

const SESSION_COOKIE = "addis-eats-session";

export function middleware(request) {
  if (request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.next();
  }

  const destination = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("next", destination);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
