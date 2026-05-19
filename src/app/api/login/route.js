import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // EMAIL CHECK
    if (
      email !== process.env.ADMIN_EMAIL
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email",
        },
        { status: 401 }
      );
    }

    // PASSWORD CHECK
    if (
      password !==
      process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login Successful",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}