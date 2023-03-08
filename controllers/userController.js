const User = require("../models/userModel");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asynHandler");

const createUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, password, mobile } = req.body;

  const userExist = await User.findOne({email});

  if (!userExist) {
    // create user

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      mobile,
    });

   return  res.status(200).json({
      status: "success",
      user,
    });
  } else{
    return next(new AppError('User Already Exist', 403))
  }


   
});

module.exports = {
  createUser,
};
