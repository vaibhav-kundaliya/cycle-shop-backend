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
const ConsumerSchema = new mongoose.Schema({
  firstName: { type: String, minlegth: 2, maxlegth: 20 },
  lastName: { type: String, minlegth: 2, maxlegth: 20 },
  email: { type: String },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  age: {
    type: Number,
  },
  address: [addressSchema],
});
const Consumer = mongoose.model("Consumer", ConsumerSchema);
module.exports = Consumer;
