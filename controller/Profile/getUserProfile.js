const resources = require("../../config/resources");
const ConsumerService = require("../../services/ConsumerService");
const userProfile = async (req, res) => {
  try {
    const consumerID = req.session.passport.user;
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
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.fetched,
        data: consumerData,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { userProfile };
