const express = require("express");
const router = express.Router();
const checkLogin = require("../middleware/checkLogin");
const stripeBuyOne = require("../controller/Payment/Stripe/singleOrder");
router.post(
  "/stripeOneOrder",
  checkLogin.isAuthenticated,
  stripeBuyOne.userOrder
);
module.exports = router;
