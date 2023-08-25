// Importing all models
const resources = require("../../config/resources"); // Importing the resources
const ConsumerCartServices = require("../../services/ConsumerCartServices");
const ProductDataServices = require("../../services/ProductDataServices");
const allItems = async (req, res) => {
   try {
      const consumerID = req.session.passport.user; // Extracting the consumer ID from the session
      const cartItem = await ConsumerCartServices.getProductIDsByConsumerID(consumerID);
      if (cartItem.status == resources.status.fail) {
         res.status(500).send({
            status: resources.status.fail,
            message: cartItem.message,
         });
      } else {
         let allCartItems = []; // Array to store all cart items
         let subTotalCost = 0; // Variable to calculate the subtotal cost of all cart items
         // Get All the products
         const allProductData = await ProductDataServices.getMultipleProductByIdSize(cartItem.data);
         console.log(allProductData);
         if (allProductData.status == resources.status.fail) {
            res.status(500).send({
               status: resources.status.fail,
               message: cartItem.message,
            });
         } else {
            // Looping through each cart item
            for (const currProduct of allProductData.data) {
               let tempItem = {
                  productID: currProduct.productData._id,
                  name: currProduct.productData.name,
                  price: currProduct.productData.price,
                  image: currProduct.productData.image,
                  size: currProduct.size,
               };
               allCartItems.push(tempItem);
               subTotalCost += currProduct.productData.price;
            }
            // Sending a success response with the cart item data and subtotal cost
            res.status(200).send({
               status: resources.status.success,
               productData: allCartItems,
               message: resources.messages.success.fetched,
               subTotal: subTotalCost,
            });
         }
      }
   } catch (err) {
      // Handling any errors that occur during the process
      res.status(500).send({
         status: resources.status.fail,
         message: resources.messages.error.generic(err),
      });
   }
};

module.exports = { allItems };
