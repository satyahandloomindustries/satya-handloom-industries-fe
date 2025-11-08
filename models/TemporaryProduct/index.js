import mongoose from 'mongoose';

const TemporaryProductSchema = new mongoose.Schema({
  name: String,
  description: [String],
  code: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  sizes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3000,
  },
});

export default mongoose.models.TemporaryProduct ||
  mongoose.model('TemporaryProduct', TemporaryProductSchema);
