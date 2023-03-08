const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asynHandler");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // token in Header
    token = req.headers.authorization.split(" ")[1];
  }
  // token in Cookie
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  if (!token) {
    return next(new AppError("Not authorized to access this route", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    return next(new AppError("Not authorized to access this route1", 401));
  }
});

// grant access
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("hey there, you are not authorized", 401));
    }
    next();
  };
};
