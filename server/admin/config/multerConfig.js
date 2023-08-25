const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    const prefix = Date.now().toString();
    cb(null, `${prefix}-${file.originalname}`);
  },
});
module.exports = storage;
