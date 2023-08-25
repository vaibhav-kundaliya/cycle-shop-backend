const OrderServices = require("../../services/OrderServices");
const resources = require("../../config/resources"); // Importing resources
const ConsumerCartServices = require("../../services/ConsumerCartServices");
const ProductDataServices = require("../../services/ProductDataServices");
const ConsumerService = require("../../services/ConsumerService");
const buyAll = async (req, res) => {
  try {
    const consumerID = req.session.passport.user; // Extracting consumer ID from the session
    const consumerRequestData = await ConsumerService.consumerDataByID(
      consumerID
    );
    const consumerData = consumerRequestData.data;
    if (consumerRequestData.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: consumerRequestData.message,
      });
    } else {
      if (consumerData.address.length == 0) {
        res.status(400).send({
          status: resources.status.fail,
          message: `Please add at least one address first, then proceed with the order.`,
        });
      } else {
        // Fetching all consumer cart orders for the consumer ID
        const consumerCartOrders =
          await ConsumerCartServices.getConsumerCartByConsumerID(consumerID);
        const productIDs = consumerCartOrders.map((obj) => obj.productID);
        const productRequestData =
          await ProductDataServices.getMultipleProductById(productIDs);
        const productData = productRequestData.data;
        let isRemaining = false;
        let remainingItems = [];
        let inStockItems = [];
        // Looping through the consumer cart orders
        for (const cartOrder of consumerCartOrders) {
          const foundProduct = productData.find(
            (product) => product._id.toString() == cartOrder.productID
          );
          if (foundProduct.quantity < cartOrder.quantity) {
            isRemaining = true;
            remainingItems.push({
              productID: foundProduct._id,
              remainingStock: foundProduct.quantity,
            });
          } else {
            inStockItems.push(cartOrder);
          }
        }

        // Checking if any items are remaining
        if (isRemaining) {
          // If items are remaining, sending a 400 status response with the remaining items
          res.status(400).send({
            status: "fail",
            message: "Not all items are in stock. Please try again.",
            remainingItems: remainingItems,
          });
        } else {
          let currConsumerAddress = consumerData.address[0];
          // Looping through the in-stock items
          for (const currItem of inStockItems) {
            const orderData = {
              productID: currItem.productID,
              orderDate: new Date(),
              orderStatus: resources.orderPhases.first,
              consumerID: consumerID,
              address: currConsumerAddress,
              size: currItem.size,
              quantity: currItem.quantity,
              color: currItem.color,
            };
            const foundProduct = productData.find(
              (product) => product._id.toString() == currItem.productID
            );
            const updateCurrItem = await ProductDataServices.changeProductQty(
              currItem.productID,
              foundProduct.quantity,
              currItem.quantity
            );
            if (updateCurrItem.status == resources.status.fail) {
              res.status(500).send({
                status: resources.status.fail,
                message: cartItem.message,
              });
            } else {
              await OrderServices.addOrderByOrderObject(orderData);
              await ConsumerCartServices.deleteFromCartWihtID(currItem._id);
            }
          }
          // Sending a 200 status response indicating the successful order
          res.status(200).send({
            status: resources.status.success,
            message: "All the cart items have been ordered",
            orderedItems: inStockItems,
          });
        }
      }
    }
  } catch (err) {
    // Handling any errors that occur during the process
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { buyAll };
