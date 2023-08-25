const resources = require("../../config/resources");
const ProductDataServices = require("../../services/ProductDataServices");
const OrderService = require("../../services/OrderServices");
const getUserOrder = async (req, res) => {
  try {
    const orderID = req.body.orderID;
    const orderDetailsRequest = await OrderService.findOrderByID(orderID);
    if (orderDetailsRequest.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: orderDetailsRequest.message,
      });
    } else {
      const orderDetails = orderDetailsRequest.data;
      if (orderDetails == null) {
        res.status(400).send({
          status: resources.status.fail,
          message: resources.messages.error.notFound,
        });
      } else {
        const productDetails = await ProductDataServices.getProductByID(
          orderDetails.productID
        );
        const allOrderData = {
          orderDate: orderDetails.orderDate,
          orderStatus: orderDetails.orderStatus,
          consumeId: orderDetails.consumerID,
          quantity: orderDetails.quantity,
          size: orderDetails.size,
          color: orderDetails.color,
          productData: productDetails,
        };
        res.status(200).send({
          status: resources.status.success,
          message: `Here is the data of order ID ${orderID}`,
          data: allOrderData,
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
module.exports = { getUserOrder };
