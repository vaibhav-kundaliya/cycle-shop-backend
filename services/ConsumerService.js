const resources = require("../config/resources");
const Consumer = require("../models/Consumer");

const consumerDataByID = async (consumerID) => {
  try {
    const results = await Consumer.findOne({ _id: consumerID });
    return { status: resources.status.success, data: results };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const addAddressByID = async (consumerID, addressData) => {
  try {
    const results = await Consumer.findOne({ _id: consumerID });
    results.address.push(addressData);
    const updatedData = await results.save();
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
const updateAddressByID = async (consumerID, addressData, addressId) => {
  try {
    const consumerdata = await Consumer.findOne({ _id: consumerID });
    const consumerAddress = consumerdata.address;
    let flag = false;
    for (let i = 0; i < consumerAddress.length; i++) {
      if (addressId == consumerAddress[i]._id) {
        consumerdata.address[i] = addressData;
        consumerdata.save();
        flag = true;
      }
    }
    return {
      status: resources.status.success,
      isPresent: flag,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const findUserByEmail = async (email) => {
  try {
    const emailResults = await Consumer.findOne({ email: email });
    return {
      status: resources.status.success,
      data: emailResults,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const searchResults = await Consumer.findOne({
      phoneNumber: phoneNumber,
    });
    return {
      status: resources.status.success,
      data: searchResults,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const updateConsumerByID = async (consumerID, updateObj) => {
  try {
    const ConsumerData = await Consumer.updateOne(
      { _id: consumerID },
      updateObj
    );
    return {
      status: resources.status.success,
      data: ConsumerData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const newConsumerByObj = async (searchObj) => {
  try {
    const newConsumer = new Consumer(searchObj);
    newConsumer.save();
    return {
      status: resources.status.success,
      data: newConsumer,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const saveNewPassword = async (userID, hashPassword) => {
  const update = {
    $set: {
      password: hashPassword,
    },
  };
  const result = await Consumer.updateOne({ _id: userID }, update);
};
const findDataByEmail = async (email) => {
  try {
    const resutlData = await Consumer.find({ email: email });
    return {
      status: resources.status.success,
      data: resutlData,
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
const passportFindByEmail = async (email) => {
  const resData = await Consumer.findOne({ email: email });
  return resData;
};
const passportFindByID = async (id) => {
  const resData = await Consumer.findOne({ _id: id });
  return resData;
};
const getAddressByID = async (id) => {
  try {
    const resData = await Consumer.findOne({ _id: id });
    return {
      status: resources.status.success,
      data: resData.address[0],
    };
  } catch (err) {
    return {
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    };
  }
};
module.exports = {
  consumerDataByID,
  addAddressByID,
  updateAddressByID,
  findUserByEmail,
  findUserByPhoneNumber,
  updateConsumerByID,
  newConsumerByObj,
  saveNewPassword,
  findDataByEmail,
  passportFindByEmail,
  passportFindByID,
  getAddressByID,
};
