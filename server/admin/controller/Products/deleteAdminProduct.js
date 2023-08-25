const Product = require("../../models/ProductData");

const deleteProduct = async (req, res) => {
  const SKU = req.body.SKU;
  try {
    const delProduct = await Product.deleteOne({ SKU: SKU });
    res.send({
      status: "success",
      message: `Product with SKU: ${SKU} has been deleted`,
      dbMessage: delProduct,
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { deleteProduct };
