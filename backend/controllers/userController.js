const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    email,
    name,
    password,
    avatar: {
      public_id: "test public id for user",
      url: "test url for avatar images",
    },
  });
  sendToken(user, 201, res);
});

//* Login Controller
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Both email & password are required"));
  }
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    return next(new ErrorHandler(401, "Invalid email Or Password"));
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return next(new ErrorHandler(401, "Invalid email Or Password"));
  }

  sendToken(user, 200, res);
});

//* Logout Controller
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  // res.cookies("token", null, options);

  res.status(200).cookie("token", null, options).json({
    success: true,
    message: "Logged Out",
  });
});
