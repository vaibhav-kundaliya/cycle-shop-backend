const ConsumerService = require("../../services/ConsumerService");
const resources = require("../../config/resources");
const addToProfile = async (req, res) => {
  try {
    const { country, state, city, zipCode, addressLine1, addressLine2 } =
      req.body;
    const consumerID = req.session.passport.user;
    const consumerRequestData = await ConsumerService.consumerDataByID(
      consumerID
    );
    const consumerData = consumerRequestData.data;
    const consumer = consumerData.address;
    let isAddressPresent = false;
    consumer.forEach((valueObj, index, consumer) => {
      const tempObj = req.body;
      tempObj._id = valueObj._id;
      if (JSON.stringify(valueObj) === JSON.stringify(req.body)) {
        isAddressPresent = true;
      }
    });
    if (isAddressPresent) {
      res.status(400).send({
        status: resources.status.fail,
        message: "This address is already present please try again",
      });
    } else {
      const addressData = {
        country: country,
        state: state,
        city: city,
        zipCode: zipCode,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
      };
      const updatedData = await ConsumerService.addAddressByID(
        consumerID,
        addressData
      );
      if (updatedData.status == resources.status.fail) {
        res.status(500).send({
          status: resources.status.fail,
          message: updatedData.message,
        });
      } else {
        res.status(201).send({
          status: resources.status.success,
          message: resources.messages.success.updated,
          data: addressData,
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
module.exports = { addToProfile };
