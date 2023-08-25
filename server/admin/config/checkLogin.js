const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ status: "fail", message: "Failed to authenticate user!" });
};
const isNotAuthicated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send({ status: "fail", message: "Failed to authenticate user!" });
  }
  return next();
};
module.exports = { isAuthenticated, isNotAuthicated };
