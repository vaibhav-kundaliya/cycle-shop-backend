const express = require("express");
const router = express.Router();
const addOrder = require("../controller/Order/addOrder");
const updateOrder = require("../controller/Order/updateOrder");
const getAllOrders = require("../controller/Order/getAllOrder");
const getOrderByID = require("../controller/Order/getOrderByID");
const cancelOrder = require("../controller/Order/cancelOrder");
const filterOrders = require("../controller/Order/filterOrders");
const checkLogin = require("../middleware/checkLogin");
router.post("/addOrder", checkLogin.isAuthenticated, addOrder.buyProduct);
router.post("/updateOrder", checkLogin.isAuthenticated, updateOrder.updateData);
router.get(
  "/getAllOrders",
  checkLogin.isAuthenticated,
  getAllOrders.getUserOrders
);
router.post(
  "/getOrderByID",
  checkLogin.isAuthenticated,
  getOrderByID.getUserOrder
);
router.post(
  "/cancelOrder",
  checkLogin.isAuthenticated,
  cancelOrder.cancelUserOrder
);
router.post(
  "/filterOrders",
  checkLogin.isAuthenticated,
  filterOrders.filterUserOrders
);
module.exports = router;
