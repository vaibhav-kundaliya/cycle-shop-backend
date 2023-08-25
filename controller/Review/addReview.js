const resources = require("../../config/resources");
const OrderService = require("../../services/OrderServices");
const ProductDataService = require("../../services/ProductDataServices");
const addProductReview = async (req, res) => {
  try {
    let errorStatusCode, errorSatusMessage;
    let errorFlag = true;
    const { productID, reviewDescription, orderID, rating } = req.body;
    const consumerID = req.session.passport.user;
    const orderDataRequest = await OrderService.findOrderByID(orderID);
    if (orderDataRequest.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: orderData.message,
      });
    } else {
      const orderData = orderDataRequest.data;
      if (orderData == null) {
        errorFlag = false;
        errorSatusMessage = "Bad request you haven't ordered this product";
        errorStatusCode = 400;
      }
      if (
        orderData != null &&
        orderData.orderStatus != resources.orderPhases.fourth
      ) {
        errorFlag = false;
        errorSatusMessage =
          "You cannot write a review yet you need the product to be delivered";
        errorStatusCode = 400;
      }
      if (errorFlag == false) {
        res.status(errorStatusCode).send({
          status: resources.status.fail,
          message: errorSatusMessage,
        });
      } else {
        const addReviewRequest = await ProductDataService.productAddReviewByID(
          productID,
          {
            rating: rating,
            reviewDescription: reviewDescription,
            consumerID: consumerID,
          }
        );
        if (addReviewRequest.status == resources.status.fail) {
          res.status(500).send({
            status: resources.status.fail,
            message: addReviewRequest.message,
          });
        } else {
          res.status(200).send({
            status: resources.status.success,
            message: resources.messages.success.created,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { addProductReview };
