const Consumer = require("../../models/Consumer");
const resources = require("../../config/resources");
const ConsumerService = require("../../services/ConsumerService");
const updateProfile = async (req, res) => {
  try {
    const {
      country,
      state,
      city,
      zipCode,
      addressLine1,
      addressLine2,
      addressId,
    } = req.body;
    const updatedAddress = {
      country: country,
      state: state,
      city: city,
      zipCode: zipCode,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
    };
    const consumerID = req.session.passport.user;
    const updatedData = await ConsumerService.updateAddressByID(
      consumerID,
      updatedAddress,
      addressId
    );
    if (updatedData.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: updatedData.message,
      });
    } else {
      if (updatedData.isPresent) {
        res.status(200).send({
          status: resources.status.success,
          message: resources.messages.success.updated,
        });
      } else {
        res.status(400).send({
          status: resources.status.fail,
          message: resources.messages.error.notFound,
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
module.exports = { updateProfile };
