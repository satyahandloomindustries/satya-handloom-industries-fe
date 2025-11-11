import mongoose from 'mongoose';

const TemporaryImageSchema = new mongoose.Schema(
  {
    assetFolder: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    phash: { type: String, required: true },
    bytes: { type: Number },
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TemporaryImages ||
  mongoose.model('TemporaryImages', TemporaryImageSchema);
