const User = require("../models/userModel");



const sendTokenResponse = async (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    if (process.env.NODE.env === "production") {
      options.secure = true;
    }
    await User.findByIdAndUpdate(user.id,{
      refreshToken:token
    })
    console.log(user)
    res.cookie("token", token, options)
    res.status(statusCode).json({
      status: "success",
      token,
    });
  };




  module.exports = sendTokenResponse



