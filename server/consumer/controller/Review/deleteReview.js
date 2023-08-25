const resources = require("../../config/resources");
const ProductDataService = require("../../services/ProductDataServices");
const deleteProductReview = async (req, res) => {
  try {
    const { reviewID, productID } = req.body;
    const productDataRequest = await ProductDataService.getProductByID(
      productID
    );
    if (productDataRequest.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: productDataRequest.message,
      });
    } else {
      const productData = productDataRequest.data;
      if (productData == null) {
        res.status(400).send({
          status: resources.status.fail,
          message: "This Product ID is incorrect",
        });
      } else {
        const deletedDataRequest =
          await ProductDataService.deleteReviewByReviewID(reviewID, productID);
        if (deletedDataRequest.status == resources.status.fail) {
          res.status(400).send({
            status: resources.status.fail,
            message: deletedDataRequest.message,
          });
        } else {
          res.status(200).send({
            status: resources.status.success,
            message: deletedDataRequest.message,
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
module.exports = { deleteProductReview };
