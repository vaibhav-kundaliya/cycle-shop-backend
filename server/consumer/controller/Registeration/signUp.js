const transporter = require("../../config/connectEmail");
const bcrypt = require("bcrypt");
const resources = require("../../config/resources");
const ConsumerService = require("../../services/ConsumerService");
const registerData = async (req, res) => {
  try {
    let { firstName, lastName, email, password, confirmPassword, phoneNumber } =
      req.body;
    const hash = async (password, saltRounds) => {
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
      } catch (err) {
        return null;
      }
    };
    const hashPassword = await hash(password, 10);
    const isPresentEmailRequest = await ConsumerService.findUserByEmail(email);
    const isPresentPhoneNoRequest = await ConsumerService.findUserByPhoneNumber(
      phoneNumber
    );
    if (
      isPresentEmailRequest.status == resources.status.fail ||
      isPresentPhoneNoRequest.status == resources.status.fail
    ) {
      res.status(500).send({
        status: resources.status.fail,
        message:
          isPresentEmailRequest.message || isPresentPhoneNoRequest.message,
      });
    } else {
      const isPresentEmail = isPresentEmailRequest.data;
      const isPresentPhoneNo = isPresentPhoneNoRequest.data;
      if (isPresentEmail != null) {
        res.status(400).send({
          message: "Email ALready Present",
          status: resources.status.fail,
        });
      } else if (isPresentPhoneNo != null) {
        res.status(400).send({
          message: "Phone number Already Present",
          status: resources.status.fail,
        });
      } else if (confirmPassword != password) {
        res.status(400).send({
          message: "Password dosen't match",
          status: resources.status.fail,
        });
      } else {
        const consumerRequestObj = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
          confirmPassword: hashPassword,
          phoneNumber: phoneNumber,
        };
        const newConsumerRequest = await ConsumerService.newConsumerByObj(
          consumerRequestObj
        );
        if (newConsumerRequest.status == resources.status.fail) {
          res.status(500).send({
            status: resources.status.fail,
            message: newConsumerRequest.message,
          });
        } else {
          const newConsumer = newConsumerRequest.data;
          try {
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: `Welcome to Fashion Heaven ${firstName}`,
              text: `Hello Tanish,\nHope you are having a great day.\nWe would like to welcome to you to our website and thanks for registering with us.\nHere are your relevent info you can always change it whenever you want.\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                res.status(500).send({
                  status: resources.status.fail,
                  message: resources.messages.error.generic(err),
                });
              } else {
                console.log("Email sent " + info);
              }
            });
          } catch (err) {
            res.status(500).send({
              status: resources.status.fail,
              message: resources.messages.error.generic(err),
            });
          }
          res.status(200).send({
            message: "Your data is inserted sucessfully",
            data: newConsumer,
            status: resources.status.success,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { registerData };
