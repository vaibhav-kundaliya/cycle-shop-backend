const Product = require("../../models/ProductData");
const randomSKU = () => {
  let min = 10000;
  let max = 99999;
  return (num = Math.floor(Math.random() * (max - min + 1)) + min); // Generate a random number between min and max (inclusive)
};
const getCurrDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
const insertProduct = async (req, res) => {
  //   console.log(req.body);
  const currAdminId = req.session.passport.user;
  // console.log(req.session.passport.user);
  const {
    name,
    price,
    size,
    productDetails,
    category,
    color,
    audience,
    quantity,
  } = req.body;
  const image = req.file.path;
  console.log(typeof color, typeof size);
  const currSKU = randomSKU();
  const currDate = getCurrDate();
  try {
    const newProduct = new Product({
      name: name,
      price: price,
      size: size,
      SKU: currSKU,
      productDetails: productDetails,
      image: image,
      quantity: quantity,
      category: category,
      color: color,
      audience: audience,
      adminId: currAdminId,
      date: currDate,
    });
    newProduct.save();
    res.send({ status: "success", data: newProduct, message: "Data recieved" });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { insertProduct };
