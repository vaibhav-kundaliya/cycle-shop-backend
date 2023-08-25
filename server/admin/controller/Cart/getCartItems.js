const Cart = require("../../models/CartData");
const allItems = async (req, res) => {
  try {
    const UserID = req.session.passport.user;
    const cartItem = await Cart.find({ UserID: UserID });
    res.send({
      status: "success",
      data: cartItem,
      message: "Product Added to cart",
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { allItems };
