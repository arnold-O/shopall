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


const loginUser = asyncHandler( async (req, res, next)=>{
    const {email, password} = req.body


    const userExist = await User.findOne({email})

    if(!userExist){
      return   next(new AppError('User does not exist', 404))
    }

    const passwordCheck = await userExist.correctpassword(userExist.password, password)

    

    if(!passwordCheck){
     return    next(new AppError('Invalid Credentials', 404))
    }

    res.status(200).json({
        status:"success",
        userExist
    })
})


const getAllUsers = asyncHandler(async(req, res, next)=>{
    const users = await User.find({})


    res.status(200).json({
        status:"success",
        users
    })
})

const getSingleUser = asyncHandler( async(req, res, next)=>{
    const {id} = req.params
 

    const singleUser = await User.findById(id)
    if(!singleUser){
        return next(new AppError('User Does Not Exist', 404))
    }


    res.status(200).json({
        status:"success",
        singleUser
    })
})

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser
};
