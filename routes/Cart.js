const express = require("express");
const router = express.Router();
const addToCart = require("../controller/Cart/addToCart");
const getCartItems = require("../controller/Cart/getCartItems");
const updateCart = require("../controller/Cart/updateCart");
const deleteFromCart = require("../controller/Cart/deleteFromCart");
const checkOutCart = require("../controller/Cart/checkOutCart");
const checkLogin = require("../middleware/checkLogin");
router.post("/addToCart", checkLogin.isAuthenticated, addToCart.addProduct);
router.get("/getCartItems", checkLogin.isAuthenticated, getCartItems.allItems);
router.post(
  "/deleteCartItem",
  checkLogin.isAuthenticated,
  deleteFromCart.deleteItem
);
router.post("/checkOutCart", checkLogin.isAuthenticated, checkOutCart.buyAll);
router.post("/updateCart", checkLogin.isAuthenticated, updateCart.update);
module.exports = router;
