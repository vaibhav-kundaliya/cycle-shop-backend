const paginatedResults = async (Model, page, limit) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < (await Model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    const productSearchData = await Model.find().limit(limit);
    let finalProductdata = [];
    for (let i = 0; i < productSearchData.length; i++) {
      const currObj = {
        SKU: productSearchData[i].SKU,
        name: productSearchData[i].name,
        price: productSearchData[i].price,
        image: productSearchData[i].image,
        reviews: productSearchData[i].reviews,
      };
      finalProductdata.push(currObj);
    }
    results.result = finalProductdata;
    return results;
  } catch (err) {
    return { message: `An error has occurred ${err}` };
  }
};
module.exports = { paginatedResults };
