const Product = require("../../models/ProductData");
const getProducts = async (req, res) => {
  const currAdminId = req.session.passport.user;
  try {
    const allProducts = await Product.find({ adminId: currAdminId });
    res.send({
      data: allProducts,
      status: "success",
      message: "Here is all the data you can access",
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { getProducts };
