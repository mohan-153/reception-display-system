import { NextResponse } from "next/server";
import Slide from "@/models/Slide";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    
    await connectToDatabase();

    const data = await req.formData();

    const title = data.get("title");
    const description = data.get("description");
    const image = data.get("image");

    // IMAGE NAME
    const fileName = Date.now() + "-" + image.name;

    // FILE PATH
    const bytes = await image.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadPath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    );

    fs.writeFileSync(uploadPath, buffer);

    // AUTO ORDER NUMBER
    const totalSlides =
      await Slide.countDocuments();

    // CREATE SLIDE
    await Slide.create({
      title,
      description,
      image: fileName,
      order: totalSlides + 1,
      isVisible: true,
    });

    return NextResponse.json({
      success: true,
      message: "Slide Added",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}