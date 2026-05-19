import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Slide from "@/models/Slide";

export async function PUT(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    const slide = await Slide.findById(id);

    if (!slide) {
      return NextResponse.json(
        {
          success: false,
          message: "Slide Not Found",
        },
        { status: 404 }
      );
    }

    slide.isVisible = !slide.isVisible;

    await slide.save();

    return NextResponse.json({
      success: true,
      message: "Slide Updated",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed To Update Slide",
      },
      { status: 500 }
    );
  }
}