const resources = require("../config/resources");
const ConsumerCart = require("../models/ConsumerCart");

const createNewCartData = async (cartData) => {
  const newCartData = new ConsumerCart(cartData);
  newCartData.save();
  return newCartData;
};
const getConsumerCartByConsumerID = async (consumerID) => {
  const resultData = await ConsumerCart.find({
    consumerID: consumerID,
  });
  return resultData;
};
const consumerCartDeleteByID = async (cartID) => {
  const resultData = await ConsumerCart.deleteOne({
    _id: cartID,
  });
  return resultData;
};
const getConsumerCartItemByID = async (cartItemID) => {
  const resultData = await ConsumerCart.findOne({ _id: cartItemID });
  return resultData;
};
const updateCartSizeQuantity = async (productID, size, quantity) => {
  const resultData = await ConsumerCart.updateOne(
    { productID: productID },
    { $set: { size: size, quantity: quantity } }
  );
  return resultData;
};
const getProductIDsByConsumerID = async (consumerID) => {
  try {
    const queryData = await ConsumerCart.find(
      { consumerID: consumerID },
      { _id: 1, productID: 1, size: 1 }
    );
    return { status: resources.status.success, data: queryData };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const deleteFromCartWihtID = async (stockID) => {
  const deleteFromCart = await ConsumerCart.deleteOne({
    _id: stockID,
  });
};
module.exports = {
  createNewCartData,
  getConsumerCartByConsumerID,
  getProductIDsByConsumerID,
  consumerCartDeleteByID,
  getConsumerCartItemByID,
  updateCartSizeQuantity,
  deleteFromCartWihtID,
};
