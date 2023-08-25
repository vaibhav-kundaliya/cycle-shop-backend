const mongoose = require("mongoose");
const resources = require("./resources.js")
const connectDB = async (DBURL) => {
  try {
    await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the Database!");
  } catch (err) {
    console.log(resources.messages.error.generic(err));
  }
};
module.exports = connectDB;
