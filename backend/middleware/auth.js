const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler(401, "Please first login to access this resource")
    );
  }
  const decodedData = await jwt.verify(token, process.env.JWT_SECRECT);
  const user = await User.findById(decodedData.id);

  req.user = user;
  next();
});
