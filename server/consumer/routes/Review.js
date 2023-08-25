const express = require("express");
const router = express.Router();
const addReview = require("../controller/Review/addReview");
const deleteReview = require("../controller/Review/deleteReview");
const checkLogin = require("../middleware/checkLogin");
router.post(
  "/addReview",
  checkLogin.isAuthenticated,
  addReview.addProductReview
);
router.post(
  "/deleteReview",
  checkLogin.isAuthenticated,
  deleteReview.deleteProductReview
);
module.exports = router;
