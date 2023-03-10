const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asynHandler");
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res, next) => {

   
  const product = await Product.create(req.body);

  res.status(200).json({
    status: "success",
    product,
  });
});

const getAllProduct = asyncHandler(async (req, res, nest) => {
  const products = await Product.find({});

  res.status(200).json({
    status: "success",
    products,
  });
});

const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.findById(id);

  if (!products) {
    return next(new AppError("Product Does not Exist"));
  }

  res.status(200).json({
    status: "success",
    products,
  });
});
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let updateProduct = await Product.findById(id);

  if (!updateProduct) {
    return next(new AppError("Product Does not Exist"));
  }

  updateProduct = await Product.findOneAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  

  res.status(200).json({
    status: "success",
    updateProduct,
  });
});

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct
};
