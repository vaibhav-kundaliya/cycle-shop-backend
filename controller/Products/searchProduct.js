const resources = require("../../config/resources");
const ProductDataService = require("../../services/ProductDataServices");
const getItem = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const category = req.query.category;
    const searchObj = {};
    if (keyword) {
      searchObj.name = { $regex: keyword, $options: "i" };
    }
    if (category) {
      searchObj.category = { $regex: category, $options: "i" };
    }
    const productRequestSearchData =
      await ProductDataService.productFilterBySearchObj(searchObj);
    if (productRequestSearchData.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: productRequestSearchData.message,
      });
    } else {
      const productSearchData = productRequestSearchData.data;
      let finalProductdata = [];
      for (let i = 0; i < productSearchData.length; i++) {
        const currObj = {
          SKU: productSearchData[i].SKU,
          name: productSearchData[i].name,
          price: productSearchData[i].price,
          image: productSearchData[i].image,
        };
        finalProductdata.push(currObj);
      }
      res.status(200).send({
        status: resources.status.success,
        data: finalProductdata,
        message: resources.messages.success.fetched,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { getItem };
