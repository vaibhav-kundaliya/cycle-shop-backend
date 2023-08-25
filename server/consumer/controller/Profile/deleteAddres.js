const resources = require("../../config/resources");
const ConsumerService = require("../../services/ConsumerService");
const getDelIndex = (AddresObj, currID) => {
  return (index = AddresObj.findIndex((item) => item._id == currID));
};
const deleteUserAddress = async (req, res) => {
  try {
    const consumerID = req.session.passport.user;
    const addressID = req.body.addressID;
    const consumerRequestData = await ConsumerService.consumerDataByID(
      consumerID
    );
    if (consumerRequestData.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: consumerRequestData.message,
      });
    } else {
      const consumerData = consumerRequestData.data;
      const delIndex = getDelIndex(consumerData.address, addressID);
      consumerData.address.pull(consumerData.address[delIndex]);
      const delData = await consumerData.save();
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.deleted,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { deleteUserAddress };
