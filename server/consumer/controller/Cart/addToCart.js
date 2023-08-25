const resources = require("../../config/resources"); // Importing resources
const ConsumerCartServices = require("../../services/ConsumerCartServices");
const ProductDataServices = require("../../services/ProductDataServices");
const addProduct = async (req, res) => {
  try {
    const { productID, color, size } = req.body; // Extracting product details from request body
    const consumerID = req.session.passport.user; // Extracting consumer ID from the session

    // Finding the product data based on the given product ID
    const productData = await ProductDataServices.getProductByID(productID);

    // Checking if the product data exists
    if (productData == null) {
      // If product data is not found, sending a 400 status response with an error message
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    } else {
      // Creating a new instance of ConsumerCart with the provided product details
      const newConsumerCart = await ConsumerCartServices.createNewCartData({
        productID: productID,
        consumerID: consumerID,
        size: size,
        color: color,
      });
      
      res.status(200).send({
        status: resources.status.success,
        data: newConsumerCart,
        message: resources.messages.success.created,
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

module.exports = { addProduct };
