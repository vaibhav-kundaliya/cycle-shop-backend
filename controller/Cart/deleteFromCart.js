const resources = require("../../config/resources"); // Importing the resources
const ConsumerCartServices = require("../../services/ConsumerCartServices");
const deleteItem = async (req, res) => {
  try {
    const cartItemID = req.body.cartItemID;

    const cartItem = await ConsumerCartServices.getConsumerCartItemByID(
      cartItemID
    );
    // Checking if the cart item exists
    if (cartItem != null) {
      const deleteProduct = await ConsumerCartServices.consumerCartDeleteByID(
        cartItemID
      );
      // Sending a success response indicating the deletion of the cart item
      res.status(200).send({
        status: resources.status.success,
        message: `Product in cart with Cart ID: ${cartItemID} is Deleted`,
      });
    } else {
      // Sending an error response if the cart item is not found
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    }
  } catch (err) {
    // Handling any errors that occur during the process
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { deleteItem };
