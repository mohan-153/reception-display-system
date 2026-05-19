import { NextResponse } from "next/server";
import Slide from "@/models/Slide";
import { connectToDatabase } from "@/lib/mongodb";

export async function DELETE(req) {
  try {
    await connectToDatabase();

    const id =
      req.nextUrl.searchParams.get("id");

    // DELETE SLIDE
    await Slide.findByIdAndDelete(id);

    // REARRANGE ORDER
    const slides = await Slide.find().sort({
      order: 1,
    });

    for (let i = 0; i < slides.length; i++) {
      slides[i].order = i + 1;

      await slides[i].save();
    }

    return NextResponse.json({
      success: true,
      message: "Slide Deleted",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}