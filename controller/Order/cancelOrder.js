const sendEmail = require("../Order/sendEmail");
const resources = require("../../config/resources");
const ProductDataServices = require("../../services/ProductDataServices");
const OrderService = require("../../services/OrderServices");

const cancelUserOrder = async (req, res) => {
  try {
    const orderID = req.body.orderID;
    const orderDataRequest = await OrderService.updateOrderByOrderID(orderID, {
      orderStatus: resources.orderPhases.cancel,
    });
    if (orderDataRequest.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: orderDataRequest.message,
      });
    }
    const orderData = orderDataRequest.data;
    if (orderData == null) {
      return res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    }
    const productID = orderData.productID;
    const ProductDataRequest = await ProductDataServices.getProductByID(
      productID
    );
    if (ProductDataRequest.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: ProductDataRequest.message,
      });
    }
    const updateDataRequest = await ProductDataServices.updateProductAddQty(
      productID,
      orderData.quantity,
      ProductDataRequest.data.quantity
    );
    if (updateDataRequest.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: updateDataRequest.message,
      });
    }
    sendEmail(req.session.passport.user, "cancelled");
    res.status(200).send({
      status: resources.status.success,
      message: `Order with Order ID ${orderID} is cancelled  `,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { cancelUserOrder };
