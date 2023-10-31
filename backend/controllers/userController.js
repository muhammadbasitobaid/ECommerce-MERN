const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

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

  res.status(201).json({
    success: true,
    user,
  });
});
