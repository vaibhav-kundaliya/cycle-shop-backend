const Product = require("../../models/ProductData");
const filter = async (req, res) => {
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
  try {
    console.log(searchObj);
    const filterProducts = await Product.find(searchObj);
    res.send({
      status: "success",
      message: `Here is your data that you needed`,
      data: filterProducts,
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { filter };
