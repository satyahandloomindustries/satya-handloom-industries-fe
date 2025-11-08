import mongoose from 'mongoose';

const TemporaryProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  productCode: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  sizes: [String],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, 
  },
  attributes: {
    type: Map,
    of: String,
    default: {},
  },
});

export default mongoose.models.TemporaryProductSchema ||
  mongoose.model('TemporaryProduct', TemporaryProductSchema);
