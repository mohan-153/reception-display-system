import { NextResponse } from "next/server";
import Slide from "@/models/Slide";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/mongodb";

export async function PUT(req) {
  try {
    await connectToDatabase();

    const formData =
      await req.formData();

    const id = formData.get("id");

    const newOrder = Number(
      formData.get("order")
    );

    const title =
      formData.get("title");

    const description =
      formData.get(
        "description"
      );

    const image =
      formData.get("image");

    // CURRENT SLIDE
    const currentSlide =
      await Slide.findById(id);

    if (!currentSlide) {
      return NextResponse.json({
        success: false,
        message:
          "Slide not found",
      });
    }

    const oldOrder =
      currentSlide.order;

    // TOTAL SLIDES
    const totalSlides =
      await Slide.countDocuments();

    // LIMIT ORDER
    let finalOrder = newOrder;

    if (finalOrder < 1) {
      finalOrder = 1;
    }

    if (
      finalOrder > totalSlides
    ) {
      finalOrder = totalSlides;
    }

    // MOVE DOWN
    if (finalOrder > oldOrder) {
      await Slide.updateMany(
        {
          order: {
            $gt: oldOrder,
            $lte: finalOrder,
          },
        },
        {
          $inc: { order: -1 },
        }
      );
    }

    // MOVE UP
    else if (
      finalOrder < oldOrder
    ) {
      await Slide.updateMany(
        {
          order: {
            $gte: finalOrder,
            $lt: oldOrder,
          },
        },
        {
          $inc: { order: 1 },
        }
      );
    }

    // UPDATE DATA
    currentSlide.order =
      finalOrder;

    currentSlide.title =
      title;

    currentSlide.description =
      description;

      // DELETE OLD FILE

if (file) {

  const oldFilePath =
    path.join(
      process.cwd(),
      "public",
      "uploads",
      slide.image
    );

  if (
    fs.existsSync(
      oldFilePath
    )
  ) {

    fs.unlinkSync(
      oldFilePath
    );
  }
}
    // IMAGE UPDATE
    if (
      image &&
      typeof image === "object"
    ) {
      const bytes =
        await image.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const fileName = `${Date.now()}-${
        image.name
      }`;

      const uploadPath =
        path.join(
          process.cwd(),
          "public/uploads",
          fileName
        );

      fs.writeFileSync(
        uploadPath,
        buffer
      );

      currentSlide.image =
        fileName;
    }

    await currentSlide.save();

    return NextResponse.json({
      success: true,
      message:
        "Slide updated successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      { status: 500 }
    );
  }
}