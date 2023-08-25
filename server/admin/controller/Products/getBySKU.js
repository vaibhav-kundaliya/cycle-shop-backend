const Product = require("../../models/ProductData");
const getProduct = async (req, res) => {
  const currSKU = req.params.SKU;
  try {
    const product = await Product.findOne({ SKU: currSKU });
    res.send({
      status: "success",
      message: `Here is the required data`,
      data: product,
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { getProduct };
