const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asynHandler");
const slugify = require("slugify");
const ApiFeatures = require("../middlewares/apiFeatures");

const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    status: "success",
    product,
  });
});

const getAllProduct = asyncHandler(async (req, res, nest) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sorting()
    .fieldlimiting()
    .paginate();

  const products = await features.query;

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

  await updateProduct.save();

  res.status(200).json({
    status: "success",
    updateProduct,
  });
});
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let deleteProduct = await Product.findById(id);

  if (!deleteProduct) {
    return next(new AppError("Product Does not Exist"));
  }

  deleteProduct = await Product.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Product Deleted successfully",
  });
});



module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
