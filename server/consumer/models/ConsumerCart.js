const mongoose = require("mongoose");

const ConsumerCartSchema = new mongoose.Schema({
  productID: {
    type: String,
    require: true,
  },
  consumerID: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  quantity: { type: Number, default: 1 }, // This is the quantity of cart
  color: {
    type: String,
    require: true,
  },
});
const ConsumerCart = mongoose.model("ConsumerCart", ConsumerCartSchema);
module.exports = ConsumerCart;
