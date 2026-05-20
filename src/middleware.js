import { NextResponse } from "next/server";

export function middleware(req) {

  const admin =
    req.cookies.get("admin");

  const pathname =
    req.nextUrl.pathname;

  // PROTECT DASHBOARD
  if (
    pathname.startsWith("/dashboard")
  ) {

    if (!admin) {

      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};