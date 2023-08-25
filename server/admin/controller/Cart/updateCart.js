const Cart = require("../../models/CartData");
const Product = require("../../models/ProductData");
const update = async (req, res) => {
  const { SKU, size, quantity } = req.body;
  try {
    const product = await Product.findOne({ SKU: SKU });
    console.log(product);
    if (quantity > product.quantity) {
      res.send({
        status: "fail",
        message: `Product out of stock. Remaining items ${product.quantity}`,
      });
    } else {
      try {
        const updateData = await Cart.updateOne(
          { SKU: SKU },
          { $set: { size: size, quantity: quantity } }
        );
        res.send({
          status: "success",
          data: updateData,
          message: `Product in cart with SKU ${SKU} is updated"`,
        });
      } catch (err) {
        res.send({ status: "fail", message: `An error has occurred ${err}` });
      }
    }
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};

module.exports = { update };
