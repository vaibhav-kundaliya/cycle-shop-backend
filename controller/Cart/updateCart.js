const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const ConsumerCartServices = require("../../services/ConsumerCartServices");
const ProductDataServices = require("../../services/ProductDataServices");

const update = async (req, res) => {
  try {
    const { productID, size, quantity } = req.body;
    const productData = await ProductDataServices.getProductByID(productID);
    if (productData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    } else {
      const product = await ProductDataServices.getProductByID(productID);
      if (quantity > product.quantity) {
        res.status(400).send({
          status: resources.status.fail,
          message: `Product out of stock. Remaining items ${product.quantity}`,
        });
      } else {
        try {
          const updateData = await ConsumerCartServices.updateCartSizeQuantity(
            productID,
            size,
            quantity
          );
          res.status(200).send({
            status: resources.status.success,
            data: updateData,
            message: resources.messages.success.updated,
          });
        } catch (err) {
          res.status(500).send({
            status: resources.status.fail,
            message: resources.messages.error.generic(err),
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

module.exports = { update };
