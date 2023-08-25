const transporter = require("../../config/connectEmail");
const Consumer = require("../../models/Consumer");
const sendMail = async (userID, orderPhase) => {
  try {
    const consumerData = await Consumer.findOne({ _id: userID });
    const { email, firstName } = consumerData;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for choosing Fashion Heaven ${firstName}`,
      text: `Hello the order is currently in phase ${orderPhase}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("An error occured " + info);
      } else {
        console.log("Email sent " + info);
      }
    });
  } catch (err) {
    console.log(`An error hass occured ${err}`);
  }
};
module.exports = sendMail;
