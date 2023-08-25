const resources = require("../config/resources");
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    status: resources.status.fail,
    message: resources.messages.error.unauthorized,
  });
};
const isNotAuthicated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send({
      status: resources.status.fail,
      message: resources.messages.error.unauthorized,
    });
  }
  return next();
};
module.exports = { isAuthenticated, isNotAuthicated };
