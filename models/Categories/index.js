import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  description: { type: String },
});

export default mongoose.models.Category ||
  mongoose.model('Category', CategorySchema);
