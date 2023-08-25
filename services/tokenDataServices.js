const resources = require("../config/resources");
const TokenData = require("../models/tokenData");

const getTokenDataByID = async (tokenId) => {
  try {
    const token = await TokenData.findOne({ _id: tokenId });
    return {
      status: resources.status.success,
      data: token,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const saveToken = async (email, token) => {
  const newToken = new TokenData({
    email: email,
    token: token,
  });
  newToken.save();
};
module.exports = { getTokenDataByID, saveToken };
