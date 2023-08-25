const express = require("express");
const router = express.Router();
const registerRoute = require("./Register");
const profileRoute = require("./Profile");
const productRoute = require("./Product");
const cartRoute = require("./Cart");
const orderRoute = require("./Order");
const reviewRoute = require("./Review");
const paymentRoute = require("./Payment");
router.get("/", (req, res) => {
  res.status(201).send({
    status: "success",
    message: "The setup of backend server is successful",
  });
});
router.use(registerRoute);
router.use(profileRoute);
router.use(productRoute);
router.use(cartRoute);
router.use(orderRoute);
router.use(reviewRoute);
router.use(paymentRoute);
module.exports = router;
