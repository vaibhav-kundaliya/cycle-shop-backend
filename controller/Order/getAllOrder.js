const resources = require("../../config/resources");
const OrderService = require("../../services/OrderServices");
const getUserOrders = async (req, res) => {
  try {
    const consumerID = req.session.passport.user;
    const productIdObj = await OrderService.getAllProductIDFromConsumerID(
      consumerID
    );
    const OrderDataRequest = await OrderService.getProductObjUsingOrderObj(
      productIdObj
    );
    if (OrderDataRequest.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: OrderDataRequest.message,
      });
    } else {
      res.status(200).send({
        status: resources.status.success,
        message: `Here is all the orders by id ${consumerID}`,
        data: OrderDataRequest.data,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { getUserOrders };
