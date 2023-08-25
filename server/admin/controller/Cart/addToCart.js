const Cart = require("../../models/CartData");
const Product = require("../../models/ProductData");
const addProduct = async (req, res) => {
  const { SKU, color, size } = req.body;
  const UserID = req.session.passport.user;
  try {
    const cartItem = await Product.findOne({ SKU: SKU });
    const newCart = new Cart({
      name: cartItem.name,
      price: cartItem.price,
      size: size,
      SKU: SKU,
      productDetails: cartItem.productDetails,
      picturePath: cartItem.picturePath,
      category: cartItem.category,
      color: color,
      audience: cartItem.audience,
      UserID: UserID,
    });
    newCart.save();
    // console.log(cartItem);
    res.send({
      status: "success",
      data: newCart,
      message: "Product Added to cart",
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { addProduct };
