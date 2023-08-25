const resources = require("../config/resources");
const Product = require("../models/ProductData");

const getProductByID = async (productID) => {
  try {
    const resultData = await Product.findOne({ _id: productID });
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
const updateProductQtyByID = async (
  productID,
  productDataQuantity,
  inStockItemsQuantity
) => {
  try {
    const resultData = await Product.updateOne(
      { _id: productID },
      { quantity: productDataQuantity - inStockItemsQuantity }
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
const updateProductAddQty = async (
  productID,
  productDataQuantity,
  inStockItemsQuantity
) => {
  try {
    const resData = await Product.findByIdAndUpdate(productID, {
      quantity: inStockItemsQuantity - productDataQuantity,
    });
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
const getMultipleProductByIdSize = async (productIDs) => {
  try {
    const productIDValues = productIDs.map((obj) => obj.productID);
    const cartProductIDs = await Product.find({
      _id: { $in: productIDValues },
    });
    const resData = [];
    for (const productID of productIDs) {
      const foundProducts = cartProductIDs.filter(
        (product) => product._id.toString() === productID.productID
      );

      if (foundProducts.length > 0) {
        const productData = {
          _id: productID._id,
          productData: foundProducts[0],
          size: productID.size,
        };
        resData.push(productData);
      }
    }
    return { status: "success", data: resData };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const getMultipleProductById = async (productIDs) => {
  try {
    const productData = await Product.find({
      _id: { $in: productIDs },
    });
    return {
      status: resources.status.success,
      data: productData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const changeProductQty = async (productID, productDataQty, inStockQty) => {
  try {
    const updateProduct = await Product.updateOne(
      { _id: productID },
      { quantity: productDataQty - inStockQty }
    );
    return {
      status: resources.status.success,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const countDocuments = async () => {
  try {
    const documentCnt = await Product.countDocuments();
    return {
      status: resources.status.success,
      data: documentCnt,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const getProductBySKU = async (SKU) => {
  try {
    const productData = await Product.findOne({ SKU: SKU });
    return {
      status: resources.status.success,
      data: productData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const productFilterBySearchObj = async (searchObj) => {
  try {
    const resultData = await Product.find(searchObj);
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
const productAddReviewByID = async (productID, reviewObj) => {
  try {
    const searchData = await Product.findOne({ _id: productID });
    const reviewData = searchData.reviews;
    reviewData.push(reviewObj);
    await searchData.save();
    return {
      status: resources.status.success,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const deleteReviewByReviewID = async (reviewID, productID) => {
  try {
    const productData = await Product.findOne({ _id: productID });
    const reviewData = productData.reviews;
    const delIndex = reviewData.find((obj) => obj._id == reviewID);
    if (delIndex == -1) {
      return {
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      };
    } else {
      reviewData.splice(delIndex, 1);
      productData.save();
      return {
        status: resources.status.success,
        message: resources.messages.success.deleted,
      };
    }
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const updateMutipleQTY = async (updateObj) => {
  try {
    for (const obj of updateObj) {
      const resData = await Product.updateOne(
        { _id: obj.id },
        {
          quantity: obj.quantity,
        }
      );
    }
    return {
      status: resources.status.success,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
module.exports = {
  getProductByID,
  updateProductQtyByID,
  updateProductAddQty,
  getMultipleProductByIdSize,
  getMultipleProductById,
  changeProductQty,
  countDocuments,
  getProductBySKU,
  productFilterBySearchObj,
  productAddReviewByID,
  deleteReviewByReviewID,
  updateMutipleQTY,
};
