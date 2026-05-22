import { NextResponse } from "next/server";

import path from "path";

import fs from "fs";


import Slide from "@/models/Slide";
import { connectToDatabase } from "@/lib/mongodb";

export async function DELETE(req) {

  try {

    await connectToDatabase();

    const id =
      req.nextUrl.searchParams.get(
        "id"
      );

    // FIND SLIDE

    const slide =
      await Slide.findById(id);

    if (!slide) {

      return NextResponse.json({
        success: false,
        message:
          "Slide not found",
      });
    }

    // FILE PATH

    const filePath =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        slide.image
      );

    // DELETE FILE

    if (
      fs.existsSync(filePath)
    ) {

      fs.unlinkSync(filePath);
    }

    // DELETE DATABASE DATA

    await Slide.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
      message:
        "Slide Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Delete Failed",
    });
  }
}