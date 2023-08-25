const Product = require("../../models/ProductData");
const pagination = require("../../helper/pagination");
const resources = require("../../config/resources");
const ProductDataService = require("../../services/ProductDataServices");
const customComparator = (a, b) => {
  return a.price - b.price;
};
function sortArrayPrice(array) {
  let resArray = array;
  resArray.sort(customComparator);
  return resArray;
}
const getProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const documentCnt = await ProductDataService.countDocuments();
    if (documentCnt.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: documentCnt.message,
      });
    } else {
      let paginationRes = await pagination.paginatedResults(
        Product,
        page,
        limit
      );
      paginationRes.result = sortArrayPrice(paginationRes.result);
      paginationRes.totalData = documentCnt;
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.fetched,
        data: paginationRes,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { getProduct };
