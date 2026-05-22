import { NextResponse }
from "next/server";

import bcrypt from "bcryptjs";


import User
from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {

  try {

    await connectToDatabase();

    const {
      name,
      email,
      password,
    } = await req.json();

    // CHECK USER

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return NextResponse.json({
        success: false,
        message:
          "User already exists",
      });
    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // SAVE USER

    await User.create({
      name,
      email,
      password:
        hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message:
        "Registration Successful",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Server Error",
    });
  }
}