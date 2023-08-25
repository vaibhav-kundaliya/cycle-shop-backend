const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: { type: String },
  email: { type: String, require: true },
});
const tokenData = mongoose.model("tokenData", tokenSchema);
module.exports = tokenData;
