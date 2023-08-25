const User = require("../../models/UserData");
const transporter = require("../../config/connectEmail");
const bcrypt = require("bcrypt");
const registerData = async (req, res) => {
  let { firstName, lastName, email, password, confirmPassword, phoneNumber } =
    req.body;
  try {
    //Hash password first
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
    // console.log(hashPassword);
    const isPresentEmail = await User.find({ email: email });
    const isPresentPhoneNo = await User.find({ phoneNumber: phoneNumber });
    if (isPresentEmail.length != 0) {
      // console.log("Email ALready Present");
      res.status(400).send({ msg: "Email ALready Present", status: "Fail" });
    } else if (isPresentPhoneNo.length != 0) {
      res
        .status(400)
        .send({ msg: "Phone number Already Present", status: "Fail" });
      // console.log("Phone number Already Present");
    } else if (confirmPassword != password) {
      res.status(400).send({ msg: "Password dosen't match", status: "Fail" });
      // console.log("Password dosen't match");
    } else {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        confirmPassword: hashPassword,
        phoneNumber: phoneNumber,
      });
      newUser.save();
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: `Welcome to Fashion Heaven ${firstName}`,
          text: `Hello Tanish,\nHope you are having a great day.\nWe would like to welcome to you to our website and thanks for registering with us.\nHere are your relevent info you can always change it whenever you want.\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.send({
              status: "fail",
              message: `An error has occurred ${err}`,
            });
          } else {
            console.log("Email sent " + info);
          }
        });
      } catch (err) {
        res.send({
          status: "fail",
          message: `A Nodemailer error has occurred: ${err}`,
        });
      }
      res.send({
        msg: "Your data is inserted sucessfully",
        data: newUser,
        status: "Sucess",
      });
    }
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { registerData };
