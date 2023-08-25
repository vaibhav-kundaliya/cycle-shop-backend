const transporter = require("../../config/connectEmail");
const jwt = require("jsonwebtoken");
const resources = require("../../config/resources");
const ConsumerService = require("../../services/ConsumerService");
const resetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const PresentEmailRequest = await ConsumerService.findDataByEmail(email);
    const isPresentEmail = PresentEmailRequest.data;
    if (isPresentEmail.length == 0) {
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
          res.status(500).send({
            status: resources.status.fail,
            message: resources.messages.error.generic(err),
          });
        } else {
          console.log("Email sent " + info);
        }
      });
      res.status(200).send({
        status: resources.status.success,
        message: "The link was sent to you email",
        data: userUrl,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { resetPass };
