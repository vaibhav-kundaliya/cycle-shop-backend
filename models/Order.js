const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
});
const orderSchema = new mongoose.Schema({
  productID: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  orderStatus: {
    type: String,
  },
  consumerID: {
    type: String,
  },
  name: {
    type: String,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  color: {
    type: String,
  },
  address: addressSchema,
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
