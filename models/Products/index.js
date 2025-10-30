import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    productCode: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    sizes: [String],
    images: [String],
    // optional dynamic attributes
    attributes: {
      type: Map,
      of: String, // or of Mixed
      default: {},
    },
  });
  

  export default mongoose.models.ProductSchema || mongoose.model("Product", ProductSchema);
