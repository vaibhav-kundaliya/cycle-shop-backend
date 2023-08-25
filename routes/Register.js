const express = require("express");
const router = express.Router();
const signup = require("../controller/Registeration/signUp");
const passport = require("passport");
const ConsumerService = require("../services/ConsumerService");
const forgetPass = require("../controller/Registeration/forgotPass");
const newPass = require("../controller/Registeration/newPass");
router.get('/homes',(req,res)=>{
  res.send("HELLO");
})
router.post("/signup", signup.registerData);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
    failureFlash: true,
  })
);
const initializePassport = require("../config/passport-config");
initializePassport(
  passport,
  async (email) => {
    return await ConsumerService.passportFindByEmail(email);
  },
  async (id) => {
    return await ConsumerService.passportFindByID(id);
  }
);
const googleInitialize = require("../config/googleAuth");
const resources = require("../config/resources");
googleInitialize(
  passport,
  async (email) => {
    return await ConsumerService.passportFindByEmail(email);
  },
  async (id) => {
    return await ConsumerService.passportFindByID(id);
  }
);
router.get(
  "/googleAuth",
  passport.authenticate("google", { failureRedirect: "/failure" }),
  (req, res) => {
    res.redirect("/success");
  }
);
router.get("/success", async (req, res) => {
  try {
    const currID = req.session.passport.user;
    const ConsumerData = await ConsumerService.passportFindByID(currID);
    res
      .status(200)
      .send({ data: ConsumerData, staus: resources.status.success });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      staus: resources.status.fail,
      message: `An error has occured ${err}`,
    });
  }
});

router.post("/forget", forgetPass.resetPass);
router.post("/reset/:token/:id", newPass.changePassword);
router.get("/failure", (req, res) => {
  res
    .status(403)
    .send({
      status: resources.status.fail,
      message: "Please recheck your creadentials",
    });
});
module.exports = router;
