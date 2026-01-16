const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: [String], // Array of image URLs for multiple product images
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
