const User = require("../../models/UserData");
const transporter = require("../../config/connectEmail");
const jwt = require("jsonwebtoken");
const resetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const isPresentEmail = await User.find({ email: email });
    if (isPresentEmail == null) {
      res.send({ status: "fail", message: "This email dosen't exists" });
    } else {
      const token = jwt.sign(
        {
          _id: isPresentEmail[0]._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const userUrl = `http://localhost:${process.env.FRONTENDPORT}/NewPassword/${token}/${isPresentEmail[0]._id}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset you password",
        text: `Please click on the following to reset your password ${userUrl}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.send({ status: "fail", message: `An error has occurred ${err}` });
        } else {
          console.log("Email sent " + info);
        }
      });
      res.send({
        status: "success",
        message: "The link was sent to you email",
        data: userUrl,
      });
    }
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { resetPass };
