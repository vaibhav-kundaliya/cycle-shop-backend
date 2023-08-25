const resources = require("../../config/resources");
const OrderService = require("../../services/OrderServices");
const filterUserOrders = async (req, res) => {
  try {
    const { filterMonth, filterYear, keyword } = req.query;
    const consumerID = req.session.passport.user;
    let currDate = new Date();
    if (filterMonth.length == 0) {
      currDate.setFullYear(currDate.getFullYear() - filterYear);
      const startDate = new Date(`${currDate.getFullYear()}-01-01`);
      const endDate = new Date(`${currDate.getFullYear()}-12-31`);
      const searchObj = {
        consumerID: consumerID,
        orderDate: { $lt: endDate, $gt: startDate },
        name: { $regex: keyword, $options: "i" },
      };
      const OrderdataRequest = await OrderService.findOrderByIDandObject(
        searchObj
      );
      if (OrderdataRequest.status == resources.status.fail) {
        res.status(500).send({
          status: resources.status.fail,
          message: OrderdataRequest.message,
        });
      } else {
        const Orderdata = OrderdataRequest.data;
        res.status(200).send({
          status: resources.status.success,
          message: "Your data is filtered successfully",
          data: Orderdata,
        });
      }
    } else if (filterYear.length == 0) {
      const startDate = new Date();
      const endDate = new Date();
      if (filterMonth == "3") {
        startDate.setMonth(startDate.getMonth() - 3);
      } else {
        startDate.setMonth(startDate.getMonth() - 6);
      }
      const searchObj = {
        consumerID: consumerID,
        orderDate: { $lt: endDate, $gt: startDate },
      };
      const OrderdataRequest = await OrderService.findOrderByIDandObject(
        searchObj
      );
      if (OrderdataRequest.status == resources.status.fail) {
        res.status(500).send({
          status: resources.status.fail,
          message: OrderdataRequest.message,
        });
      } else {
        const Orderdata = OrderdataRequest.data;
        res.status(200).send({
          status: resources.status.success,
          message: "Your data is filtered successfully",
          data: Orderdata,
        });
      }
    } else {
      res.status(400).send({
        status: resources.status.fail,
        message: `The input is in the wrong format`,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { filterUserOrders };
