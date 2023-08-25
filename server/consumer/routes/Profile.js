const express = require("express");
const router = express.Router();
const getUserProfile = require("../controller/Profile/getUserProfile");
const addAddress = require("../controller/Profile/addAddress");
const getAllAddress = require("../controller/Profile/getAllAdress");
const deleteAddress = require("../controller/Profile/deleteAddres");
const updateDetailes = require("../controller/Profile/updateInformation");
const updateAddress = require("../controller/Profile/updateAddress");
const checkLogin = require("../middleware/checkLogin");
router.get("/getUser", checkLogin.isAuthenticated, getUserProfile.userProfile);
router.post("/addAddress", checkLogin.isAuthenticated, addAddress.addToProfile);
router.get(
  "/getUserAddress",
  checkLogin.isAuthenticated,
  getAllAddress.getUserAddress
);
router.post(
  "/deleteAddress",
  checkLogin.isAuthenticated,
  deleteAddress.deleteUserAddress
);
router.post(
  "/updateConsumer",
  checkLogin.isAuthenticated,
  updateDetailes.updateInfo
);
router.post(
  "/updateAddress",
  checkLogin.isAuthenticated,
  updateAddress.updateProfile
);
module.exports = router;
