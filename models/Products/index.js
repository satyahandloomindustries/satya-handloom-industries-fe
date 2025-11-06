import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    productCode: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" , required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" , required: true},
    images: [String],
    attributes: {
      type: Map,
      of: String,
      default: {},
    },
  });
  

  export default mongoose.models.ProductSchema || mongoose.model("Product", ProductSchema);
