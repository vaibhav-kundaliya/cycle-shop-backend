const express = require("express");
const router = express.Router();
const signup = require("../controller/Registeration/signUp");
const passport = require("passport");
const User = require("../models/UserData");
const forgetPass = require("../controller/Registeration/forgotPass");
const newPass = require("../controller/Registeration/newPass");
const registerData = require("../controller/Products/registerData");
const multer = require("multer");
const storage = require("../config/multerConfig");
const checkLogin = require("../config/checkLogin");
const adminProducts = require("../controller/Products/getAdminProducts");
const updateAdminProduct = require("../controller/Products/updateAdminProduct");
const deleteAdminProduct = require("../controller/Products/deleteAdminProduct");
const productFilter = require("../controller/Products/productFilter");
const getBySKU = require("../controller/Products/getBySKU");
const addToCart = require("../controller/Cart/addToCart");
const getCartItems = require("../controller/Cart/getCartItems");
const updateCart = require("../controller/Cart/updateCart");
const deleteFromCart = require("../controller/Cart/deleteFromCart");
router.get("/", (req, res) => {
  res.send({ result: "The setup of backend server was completed" });
});

// USER ROUTES
const upload = multer({ storage });

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/sucess",
    failureRedirect: "/failure",
    failureFlash: true,
  })
);

router.get("/sucess", async (req, res) => {

  try{const currID = req.session;
    console.log(currID)
  // const userData = await User.findOne({ _id: currID });
  res.send({   staus: "success" });}catch(err){
    res.send({status:"fail", message:`error ${err}`})
  }
});

router.get("/failure", (req, res) => {
  res.send({ status: "fail" });
});

router.post("/forget", forgetPass.resetPass);
router.post("/signup", signup.registerData);
router.post("/reset/:token/:id", newPass.changePassword);
// Product API
router.get(
  "/adminProducts",
  checkLogin.isAuthenticated,
  adminProducts.getProducts
);
router.post(
  "/updateProduct",
  checkLogin.isAuthenticated,
  updateAdminProduct.updateProducts
);
router.post(
  "/insertProduct",
  upload.single("image"),
  checkLogin.isAuthenticated,
  registerData.insertProduct
);
router.post(
  "/deleteProduct",
  checkLogin.isAuthenticated,
  deleteAdminProduct.deleteProduct
);
router.get("/productFilter", checkLogin.isAuthenticated, productFilter.filter);
router.get("/getProduct/:SKU", checkLogin.isAuthenticated, getBySKU.getProduct);
// Cart API
router.post("/addToCart", checkLogin.isAuthenticated, addToCart.addProduct);
router.get("/getCartItems", checkLogin.isAuthenticated, getCartItems.allItems);
router.post("/updateCart", checkLogin.isAuthenticated, updateCart.update);
router.post(
  "/deleteCartItem",
  checkLogin.isAuthenticated,
  deleteFromCart.deleteItem
);
module.exports = router;
