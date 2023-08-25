const User = require("../../models/UserData");
const bcrypt = require("bcrypt");
const tokenData = require("../../models/tokenData");
const changePassword = async (req, res) => {
  let { token, id } = req.params;
  console.log(token, id);
  const { password, confirmPassword } = req.body;
  try {
    const userID = id;
    const currUser = await User.find({ _id: userID });
    if (currUser == null) {
      res.send({ result: "This user dosen't exits.", status: "fail" });
    }
    console.log(currUser);
    const currToken = await tokenData.find({ token: token });
    if (currToken.length != 0) {
      res.send({ status: "fair", message: "The link here is expired" });
    } else {
      if (await bcrypt.compare(password, currUser[0].password)) {
        res.send({
          result: "The new password can't be same as the old one.",
          status: "fail",
        });
      }
      if (password !== confirmPassword) {
        res.send({ result: "Your pasword dosen't match!", status: "fail" });
      }
      const hash = async (password, saltRounds) => {
        try {
          const salt = await bcrypt.genSalt(saltRounds);
          return await bcrypt.hash(password, salt);
        } catch (err) {
          console.log("An error has occured " + err);
          return null;
        }
      };
      const hashPassword = await hash(password, 10);
      const update = {
        $set: {
          password: hashPassword,
        },
      };
      const newToken = new tokenData({
        email: currUser[0].email,
        token: token,
      });
      newToken.save();
      const result = await User.updateOne({ _id: userID }, update);
      console.log(result);
      res.send({
        result: "Password is updated Sucessfully!",
        status: "success ",
        newPass: password,
      });
    }
  } catch (err) {
    res.send({ result: `An error has occurred ${err}`, status: "fail" });
  }
};
module.exports = { changePassword };
