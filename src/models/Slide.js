import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema({
  order: Number,
  title: String,
  description: String,
  image: String,
  isVisible: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Slide ||
  mongoose.model("Slide", SlideSchema);