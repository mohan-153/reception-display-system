import { NextResponse } from "next/server";


import User from "@/models/User";

import bcrypt from "bcryptjs";

import { createToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {

  try {

    await connectToDatabase();

    const {
      email,
      password,
    } = await req.json();

    // FIND USER

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return NextResponse.json({
        success: false,
        message:
          "User not found",
      });
    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return NextResponse.json({
        success: false,
        message:
          "Invalid Password",
      });
    }

    // CREATE JWT TOKEN

    const token =
      createToken({
        id: user._id,
        email: user.email,
      });

    // RESPONSE

    const response =
      NextResponse.json({
        success: true,
      });

    // SAVE TOKEN COOKIE

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,

        secure: false,

        sameSite: "lax",

        path: "/",

        maxAge:
          60 * 60 * 24,
      }
    );

    return response;

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Server Error",
    });
  }
}