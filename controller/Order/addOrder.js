const sendMail = require("../Order/sendEmail");
const resources = require("../../config/resources");
const ProductDataServices = require("../../services/ProductDataServices");
const ConsumerService = require("../../services/ConsumerService");
const OrderService = require("../../services/OrderServices");

const buyProduct = async (req, res) => {
  try {
    const { productID, size, quantity, color, name } = req.body;
    const consumerID = req.session.passport.user;
    const orderDateObj = new Date();
    const orderStatus = resources.orderPhases.first;
    const productDataRequest = await ProductDataServices.getProductByID(
      productID
    );
    const ConsumerRequestData = await ConsumerService.consumerDataByID(
      consumerID
    );
    if (productDataRequest.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: productDataRequest.message,
      });
    }
    if (ConsumerRequestData.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: ConsumerRequestData.message,
      });
    }
    const ConsumerData = ConsumerRequestData.data;
    const productData = productDataRequest.data;
    if (productData == null) {
      return res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    }
    if (ConsumerData.address.length == 0) {
      return res.status(400).send({
        status: resources.status.fail,
        message: `Please add atleast one address first then order`,
      });
    }
    if (productData.quantity < quantity) {
      return res.status(400).send({
        status: resources.status.fail,
        message: `The item with item id ${productData._id} is not in stock`,
      });
    }
    const address = ConsumerData.address[0];
    const newOrderData = {
      productID: productID,
      orderStatus: orderStatus,
      orderDate: orderDateObj,
      consumerID: consumerID,
      name: name,
      size: size,
      color: color,
      quantity: quantity,
      address: address,
    };
    const newOrderRequest = await OrderService.addOrderByOrderObject(
      newOrderData
    );
    if (newOrderRequest.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: newOrderRequest.message,
      });
    }
    const updateProduct = await ProductDataServices.updateProductQtyByID(
      productID,
      productData.quantity,
      quantity
    );
    if (updateProduct.status == resources.status.fail) {
      return res.status(500).send({
        status: resources.status.fail,
        message: updateProduct.message,
      });
    }
    res.status(200).send({
      status: resources.status.success,
      message: "Your order is added successfully",
      data: newOrderRequest.data,
    });
    sendMail(consumerID, orderStatus);
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { buyProduct };
