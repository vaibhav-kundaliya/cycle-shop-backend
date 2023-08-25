const bcrypt = require("bcrypt");
const resources = require("../../config/resources");
const ConsumerService = require("../../services/ConsumerService");
const tokenDataServices = require("../../services/tokenDataServices");
const changePassword = async (req, res) => {
  try {
    let { token, id } = req.params;
    const { password, confirmPassword } = req.body;
    let errorFlag = false;
    let errorMessage = "";
    const currUser = await ConsumerService.consumerDataByID(id);
    if (currUser.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: currUser.message,
      });
    } else {
      if (currUser == null) {
        errorFlag = true;
        errorMessage = `User with User ID ${id} dosen't exists`;
      }
      const tokenData = await tokenDataServices.getTokenDataByID(id);
      if (tokenData.data != null) {
        errorFlag = true;
        errorMessage = "The link here is expired";
      } else {
        if (await bcrypt.compare(password, currUser.data.password)) {
          errorFlag = true;
          errorMessage = "The new password can't be same as the old one.";
        }
        if (password != confirmPassword) {
          errorFlag = true;
          errorMessage = "Your pasword dosen't match!";
        } else {
          const hash = async (password, saltRounds) => {
            try {
              const salt = await bcrypt.genSalt(saltRounds);
              return await bcrypt.hash(password, salt);
            } catch (err) {
              console.log("An error has occured " + err);
              return null;
            }
          };
          const hashPassword = await hash(password, 10);

          await tokenDataServices.saveToken(currUser.data.email, token);
          await ConsumerService.saveNewPassword(id, hashPassword);
        }
      }
    }
    if (errorFlag == false) {
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.updated,
      });
    } else {
      res.status(400).send({
        status: resources.status.fail,
        message: errorMessage,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { changePassword };
