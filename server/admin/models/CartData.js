const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: { type: String, require: true, minlegth: 2, maxlegth: 20 },
  price: { type: Number, require: true },
  size: {
    type: String,
    require: true,
  },
  SKU: { type: String, require: true },
  productDetails: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    default: "",
  },
  reviews: [
    {
      rating: { type: Number },
      reviewDescription: { type: String },
    },
  ],
  quantity: { type: Number, default: 1 }, // This is the quantity of cart
  catagory: { type: String, require: true },
  color: {
    type: String,
    require: true,
  },
  audience: { type: String, require: true },
  UserID: { type: String, require: true },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
