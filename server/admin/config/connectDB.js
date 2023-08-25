const mongoose = require("mongoose");
const connectDB = async (DBURL) => {
  try {
    await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the Database!");
  } catch (err) {
    console.log("Error has occured " + err);
  }
};
module.exports = connectDB;
