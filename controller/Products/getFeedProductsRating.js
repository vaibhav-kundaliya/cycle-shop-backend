const Product = require("../../models/ProductData");
const pagination = require("../../helper/reviewPagination");
const resources = require("../../config/resources");
const ProductDataService = require("../../services/ProductDataServices");
const customComparator = (a, b) => {
  return b.rating - a.rating;
};

function sortArrayRating(array) {
  let tempArray = array;
  let ratingArray = [];
  for (let i = 0; i < tempArray.length; i++) {
    let currObj = {
      SKU: tempArray[i].SKU,
      name: tempArray[i].name,
      price: tempArray[i].price,
      image: tempArray[i].image,
    };
    if (tempArray[i].reviews.length != 0) {
      const currReview = tempArray[i].reviews;
      let sumRating = 0;
      for (let i = 0; i < currReview.length; i++) {
        sumRating += currReview[i].rating;
      }
      let avgRating = sumRating / currReview.length;
      const truncatedRating = Math.floor(avgRating * 100) / 100;
      currObj.rating = truncatedRating;
    } else {
      currObj.rating = 0;
    }
    ratingArray.push(currObj);
  }
  ratingArray.sort(customComparator);
  return ratingArray;
}
const getProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const documentCnt = await ProductDataService.countDocuments();
    if (documentCnt.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: documentCnt.message,
      });
    } else {
      let paginationRes = await pagination.paginatedResults(
        Product,
        page,
        limit
      );
      paginationRes.result = sortArrayRating(paginationRes.result);
      paginationRes.totalData = documentCnt;
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.fetched,
        data: paginationRes,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { getProduct };
