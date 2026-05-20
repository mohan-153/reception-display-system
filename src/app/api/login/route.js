import { NextResponse } from "next/server";

import { createToken } from "@/lib/auth";

export async function POST(req) {

  try {

    const {
      email,
      password,
    } = await req.json();

    // STATIC ADMIN
    if (
      email ===
        "admin@gmail.com" &&
      password === "admin123"
    ) {

      // CREATE TOKEN
      const token =
        createToken({
          email,
        });

      const response =
        NextResponse.json({
          success: true,
        });

      // SAVE COOKIE
      response.cookies.set(
        "token",
        token,
        {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          path: "/",
          maxAge:
            60 * 60 * 24,
        }
      );

      return response;
    }

    return NextResponse.json({
      success: false,
      message:
        "Invalid Credentials",
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message:
        "Server Error",
    });
  }
}