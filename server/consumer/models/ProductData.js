const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String,  minlegth: 2, maxlegth: 20 },
  price: { type: Number },
  size: {
    type: Array,
    items: {
      type: String,
    },
  },
  SKU: { type: String },
  productDetails: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  reviews: [
    {
      rating: { type: Number },
      reviewDescription: { type: String },
      consumerID: { type: String },
    },
  ],
  quantity: { type: Number },
  category: { type: String },
  color: {
    type: Array,
    items: {
      type: String,
    },
  },
  audience: { type: String },
  adminId: { type: String },
  date: { type: String },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
