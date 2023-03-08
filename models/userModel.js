const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,      
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked:{
      type: Boolean,
      default:false

    },
    cart:{
        type:Array,
        default:[]
    },
    address:[{
        type: mongoose.Schema.ObjectId,
        ref: "Address",   
      }],

      wishlist:[{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
       

      }]
},{
    timestamps:true
});



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    
  
    next();
  });

  userSchema.methods.correctpassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

//Export the model
module.exports = mongoose.model('User', userSchema);