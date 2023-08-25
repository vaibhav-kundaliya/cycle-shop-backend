const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const routes = require("./routes/routes");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./API/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use("/public/assets", express.static("./public/assets"));
const PORT = process.env.PORT || 9001;
const docsURL = process.env.DOCSURL;
const URL = process.env.MONGOURL;
connectDB(URL);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation is running at ${docsURL}`);
});
