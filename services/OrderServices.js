const resources = require("../config/resources");
const Order = require("../models/Order");
const Product = require("../models/ProductData");
const addOrderByOrderObject = async (orderObject) => {
  try {
    const orderData = await Order.create(orderObject);
    orderData.save();
    return {
      status: resources.status.success,
      data: orderData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error(err),
    };
  }
};
const deleteOrderByOrderID = async (orderID) => {
  try {
    const resultData = await Order.findByIdAndDelete(orderID);
    return {
      status: resources.status.success,
      data: resultData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const updateOrderByOrderID = async (orderID, updateObj) => {
  try {
    const resultData = await Order.findOneAndUpdate(
      { _id: orderID },
      updateObj
    );
    return {
      status: resources.status.success,
      data: resultData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const findOrderByIDandObject = async (searchObj) => {
  try {
    const resultData = await Order.find(searchObj);
    return {
      status: resources.status.success,
      data: resultData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const findOrderByID = async (orderID) => {
  try {
    const resultData = await Order.findOne({ _id: orderID });
    return {
      status: resources.status.success,
      data: resultData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      data: null,
      message: resources.messages.error.generic(err),
    };
  }
};
const getOrderFromConsumer = async (consumerID) => {
  const resultData = await Order.find({ consumerID: consumerID });
  console.log(resultData);
};
const getAllProductIDFromConsumerID = async (consumerID) => {
  try {
    const productIdData = await Order.find(
      { consumerID: consumerID },
      { productID: 1, _id: 1, orderDate: 1, orderStatus: 1 }
    );
    return productIdData;
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const getProductObjUsingOrderObj = async (productIdObj) => {
  try {
    const productId = productIdObj.map((obj) => obj.productID);
    const getAllProduct = await Product.find({
      _id: { $in: productId },
    });
    const resData = [];
    for (const currElement of productIdObj) {
      const foundElement = getAllProduct.filter(
        (obj) => obj._id == currElement.productID
      );

      if (foundElement.length != 0) {
        resData.push({
          orderID: currElement._id,
          name: foundElement[0].name,
          orderDate: currElement.orderDate,
          image: foundElement[0].image,
          orderStatus: currElement.orderStatus,
        });
      }
    }
    return {
      status: resources.status.success,
      data: resData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const addMultipleOrder = async (newOrderData) => {
  try {
    const resData = await Order.insertMany(newOrderData);
    return {
      status: resources.status.success,
      data: resData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
module.exports = {
  addOrderByOrderObject,
  deleteOrderByOrderID,
  updateOrderByOrderID,
  findOrderByIDandObject,
  findOrderByID,
  getOrderFromConsumer,
  getAllProductIDFromConsumerID,
  getProductObjUsingOrderObj,
  addMultipleOrder,
};
