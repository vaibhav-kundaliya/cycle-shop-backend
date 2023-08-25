const resources = require("../../config/resources");
const ConsumerService = require("../../services/ConsumerService");
const updateInfo = async (req, res) => {
  try {
    const consumerID = req.session.passport.user;
    const { firstName, lastName, email, phoneNumber, age } = req.body;
    const isPresentEmail = await ConsumerService.findUserByEmail(email);
    const isPresentPhoneNumber = await ConsumerService.findUserByPhoneNumber(
      phoneNumber
    );
    if (
      isPresentEmail.status == resources.status.fail ||
      isPresentPhoneNumber.status == resources.status.fail
    ) {
      res.status(500).send({
        status: resources.status.fail,
        message: isPresentEmail.message || isPresentPhoneNumber.message,
      });
    } else {
      if (isPresentEmail.data == null && isPresentPhoneNumber.data == null) {
        const updateConsumerObj = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          age: age,
        };
        const ConsumerUpdateRequest = await ConsumerService.updateConsumerByID(
          consumerID,
          updateConsumerObj
        );
        if (ConsumerUpdateRequest.status == resources.status.fail) {
          res.status(500).send({
            status: resources.status.fail,
            message: ConsumerUpdateRequest.message,
          });
        } else {
          res.status(200).send({
            status: resources.status.success,
            message: resources.messages.success.updated,
          });
        }
      } else if (isPresentEmail.data != null) {
        res.status(400).send({
          status: resources.status.fail,
          message: `${email} email is already present try again`,
        });
      } else {
        res.status(400).send({
          status: resources.status.fail,
          message: `${phoneNumber} phone number is already present try again`,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { updateInfo };
