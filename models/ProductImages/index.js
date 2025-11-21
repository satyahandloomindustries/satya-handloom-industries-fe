import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    assetFolder: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    phash: { type: String, required: true },
    size: { type: Number },
    width: { type: Number },
    height: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
