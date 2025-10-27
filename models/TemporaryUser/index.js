import mongoose from "mongoose";

const TemporaryUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // document auto-deletes after 5 minutes
    },
  }
);

export default mongoose.models.TemporaryUser || mongoose.model("TemporaryUser", TemporaryUserSchema);
