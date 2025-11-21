import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
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
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
  attributes: {
    type: Map,
    of: String,
    default: {},
  },
});

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
