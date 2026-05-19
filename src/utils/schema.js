import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slide =
  mongoose.models.Slide ||
  mongoose.model("Slide", SlideSchema);

export default Slide;