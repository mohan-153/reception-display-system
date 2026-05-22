import { NextResponse } from "next/server";

export function middleware(request) {

  const token =
    request.cookies.get(
      "token"
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  // PROTECTED ROUTES

  const protectedRoutes = [
    "/dashboard",
    "/display",
  ];

  const isProtected =
    protectedRoutes.some(
      (route) =>
        pathname.startsWith(
          route
        )
    );

  // IF NO TOKEN

  if (
    isProtected &&
    !token
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/display/:path*",
  ],
};