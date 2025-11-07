import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },        // Original filename
    url: { type: String, required: true },            // Cloudinary URL
    publicId: { type: String, required: true },       // Cloudinary public ID
    phash: { type: String, required: true },          // Perceptual hash
    size: { type: Number },                           // File size in bytes
    mimeType: { type: String },                       // image/jpeg, image/png, etc.
    width: { type: Number },                          // Image width
    height: { type: Number },                         // Image height
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
