const User = require("../models/userModel");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asynHandler");
const sendTokenResponse = require('../utils/jwebtoken')




const createUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, password, mobile } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    // create user

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      mobile,
    });

    return res.status(200).json({
      status: "success",
      user,
    });
  } else {
    return next(new AppError("User Already Exist", 403));
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User does not exist", 404));
  }

  const passwordCheck = await user.correctpassword(password, user.password);

  if (!passwordCheck) {
    return next(new AppError("Invalid Credentials", 404));
  }
 
  sendTokenResponse(user, 200, res);
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    users,
  });
});

const getSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const singleUser = await User.findById(id);
  if (!singleUser) {
    return next(new AppError("User Does Not Exist", 404));
  }

  res.status(200).json({
    status: "success",
    singleUser,
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const singleUser = await User.findById(id);
  if (!singleUser) {
    return next(new AppError("User Does Not Exist", 404));
  }

  const user = await User.findByIdAndDelete(id);

  sendTokenResponse(user, 200, res);
});
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;

  const singleUser = await User.findById(id);

  if (!firstname && !lastname && !email) {
    return next(new AppError("Please enter the Fields", 404));
  }
  if (!singleUser) {
    return next(new AppError("User Does Not Exist", 404));
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      firstname,
      lastname,
      email,
    },
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(200).json({
    status: "success",
    user,
  });
});

const blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const singleUser = await User.findById(id);
  if (!singleUser) {
    return next(new AppError("User Does Not Exist", 404));
  }

  await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "User Blocked",
  });
});
const unBlockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const singleUser = await User.findById(id);
  if (!singleUser) {
    return next(new AppError("User Does Not Exist", 404));
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "User Unblocked",
  });
});
// @desc    Log User Out / Clear cookie
// @route   Get /api/v1/auth/logout
// @access   Private

const logout = asyncHandler(async (req, res, next) => {
  const user = req.user


 await User.findByIdAndUpdate(user.id, {
  refreshToken:""
})

 
 
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly:true
  })
 

  res.status(200).json({
    status: "success",
    
  });
});

const updatePassword = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user._id).select("password");

  const passwordCheck = await user.correctpassword(
    req.body.oldpassword,
    user.password
  );
 

  if (!passwordCheck) {
    return next(new AppError("credentials are incorrect, please", 400));
  }

  user.password = req.body.newpassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  logout,
  updatePassword
};
