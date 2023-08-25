const resources = require("../../../config/resources");
const ProductServices = require("../../../services/ProductDataServices");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const OrderServices = require("../../../services/OrderServices");
const ConsumerService = require("../../../services/ConsumerService");
const userOrder = async (req, res) => {
  try {
    const userOrderData = req.body.userOrdersID;
    const consumerID = req.session.passport.user;
    const productDataID = userOrderData.map((obj) => obj.productID);
    const orderProductDataReq = await ProductServices.getMultipleProductById(
      productDataID
    );
    if (orderProductDataReq.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: orderProductData.message,
      });
    }
    const orderProductData = orderProductDataReq.data;
    const addressRequest = await ConsumerService.getAddressByID(consumerID);
    if (addressRequest.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: addressRequest.message,
      });
    }
    const address = addressRequest.data;
    const updateObj = [];
    const lineItemsRes = [];
    const newOrderData = [];
    for (const ele of userOrderData) {
      const foundElement = orderProductData.find(
        (obj) => obj._id == ele.productID
      );
      if (foundElement.quantity < ele.quantity) {
        return res.status(400).send({
          status: resources.status.fail,
          message: `The Object with Product ID-${ele.productID} is out of quantity`,
        });
      } else {
        updateObj.push({
          id: ele.productID,
          quantity: Math.abs(foundElement.quantity - ele.quantity),
        });
        lineItemsRes.push({
          price_data: {
            currency: "inr",
            unit_amount: foundElement.price * 100,
            product_data: {
              name: foundElement.name,
              description: foundElement.name,
            },
          },
          quantity: ele.quantity,
        });
        newOrderData.push({
          productID: ele.productID,
          orderStatus: resources.orderPhases.first,
          orderDate: new Date(),
          consumerID: consumerID,
          size: ele.size,
          color: ele.color,
          quantity: ele.quantity,
          address: address,
        });
      }
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItemsRes,
      success_url: `http://localhost:8001/`,
      cancel_url: `http://localhost:8001/api-docs/`,
    });
    const updateReq = await ProductServices.updateMutipleQTY(updateObj);
    if (updateReq.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: updateReq.message,
      });
    }
    const addOrderReq = await OrderServices.addMultipleOrder(newOrderData);
    if (addOrderReq.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: addOrderReq.message,
      });
    }
    res.status(200).send({
      status: resources.status.success,
      data: lineItemsRes,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { userOrder };
