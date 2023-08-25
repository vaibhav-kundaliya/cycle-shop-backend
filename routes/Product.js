const express = require("express");
const router = express.Router();
const productFilter = require("../controller/Products/productFilter");
const getFeedItems = require("../controller/Products/getFeedProductsRadnom");
const getFeedItemsPrice = require("../controller/Products/getFeedProductsPrice");
const getFeedItemsRating = require("../controller/Products/getFeedProductsRating");
const searchProduct = require("../controller/Products/searchProduct");
const getBySKU = require("../controller/Products/getProductSKU");
const checkLogin = require("../middleware/checkLogin");
router.get("/productFilter", checkLogin.isAuthenticated, productFilter.filter);
router.get(
  "/feedProducts/:page?/:limit?",
  checkLogin.isAuthenticated,
  getFeedItems.getProduct
);
router.get(
  "/feedProductsPrice/:page?/:limit?",
  checkLogin.isAuthenticated,
  getFeedItemsPrice.getProduct
);
router.get(
  "/feedProductsRating/:page?/:limit?",
  checkLogin.isAuthenticated,
  getFeedItemsRating.getProduct
);
router.post("/getBySKU", checkLogin.isAuthenticated, getBySKU.getProduct);
router.get(
  "/searchProduct/:keyword?",
  checkLogin.isAuthenticated,
  searchProduct.getItem
);
module.exports = router;
