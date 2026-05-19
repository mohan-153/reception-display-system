import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Slide from "@/models/Slide";

export async function GET() {
  try {
    await connectToDatabase();

    const slides = await Slide.find().sort({
      order: 1,
    });

    return NextResponse.json(slides);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed To Fetch Slides",
      },
      { status: 500 }
    );
  }
}