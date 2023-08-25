const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const routes = require("./routes/routes");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const User = require("./models/UserData");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
app.use(express.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
   session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
   })
);
app.use(
   cors({
      origin: "http://localhost:3000", // Adjust the origin to your front-end's URL
      credentials: true, // Make sure to include this if you're sending cookies or authentication headers
   })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use("/public/assets", express.static("./public/assets"));
const initializePassport = require("./config/passport-config");
initializePassport(
   passport,
   (email) => {
      return User.findOne({ email: email });
   },
   (id) => {
      return User.findOne({ _id: id });
   }
);
const PORT = process.env.PORT || 9001;
const URL = process.env.MONGOURL;
connectDB(URL);
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
