const resources = require("../../config/resources");
const ProductDataService = require("../../services/ProductDataServices");
const getProduct = async (req, res) => {
  try {
    const SKU = req.body.SKU;
    const productRequestData = await ProductDataService.getProductBySKU(SKU);
    if (productRequestData.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: productRequestData.message,
      });
    } else {
      const productData = productRequestData.data;
      if (productData == null) {
        res.status(400).send({
          staus: resources.status.fail,
          message: resources.messages.error.notFound,
        });
      } else {
        res.status(200).send({
          staus: resources.status.success,
          message: "Here is the product data you want",
          data: productData,
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

module.exports = { getProduct };
