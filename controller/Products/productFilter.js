const resources = require("../../config/resources");
const ProductDataService = require("../../services/ProductDataServices");
const filter = async (req, res) => {
  try {
    const audience = req.query.audience || null;
    const category = req.query.category || null;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const searchObj = { price: { $gte: minPrice, $lte: maxPrice } };
    if (audience != null) {
      searchObj.audience = audience;
    }
    if (category != null) {
      searchObj.category = category;
    }
    console.log(searchObj);
    const filterRequestProducts =
      await ProductDataService.productFilterBySearchObj(searchObj);
    if (filterRequestProducts.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: filterRequestProducts.message,
      });
    } else {
      const filterProducts = filterRequestProducts.data;
      let resultProduct = [];
      for (let i = 0; i < filterProducts.length; i++) {
        const currObj = {
          SKU: filterProducts[i].SKU,
          name: filterProducts[i].name,
          image: filterProducts[i].image,
          price: filterProducts[i].price,
        };
        resultProduct.push(currObj);
      }
      res.status(200).send({
        status: resources.messages.success.fetched,
        message: `Here is your data that you needed`,
        data: resultProduct,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { filter };
