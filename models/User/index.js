import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // adds createdAt and updatedAt automatically
);

// Avoid model recompilation error in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);
