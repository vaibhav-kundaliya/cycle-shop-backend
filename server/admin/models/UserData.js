const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true, minlegth: 2, maxlegth: 20 },
  lastName: { type: String, require: true, minlegth: 2, maxlegth: 20 },
  email: { type: String, require: true },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  age: {
    type: Number,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
