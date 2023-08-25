const express = require("express");
const router = express.Router();
const checkLogin = require("../middleware/checkLogin");
const getInvoice = require("../controller/Invoice/getInvoice");
router.get(
  "/consumerInvoice/:orderID?",
  checkLogin.isAuthenticated,
  getInvoice.invoicePdf
);
module.exports = router;
