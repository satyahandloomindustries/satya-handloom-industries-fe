import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  description: { type: String},
  sizes: {type: [String] , default: []},
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
