// proxy.js

import { NextResponse } from "next/server";

export function proxy(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};