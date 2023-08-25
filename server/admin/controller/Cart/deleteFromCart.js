const Cart = require("../../models/CartData");
const deleteItem = async (req, res) => {
  const SKU = req.body.SKU;
  try {
    const deleteProduct = await Cart.deleteOne({ SKU: SKU });
    res.send({
      status: "success",
      data: deleteProduct,
      message: `Product in cart with SKU ${SKU} is Deleted"`,
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { deleteItem };
