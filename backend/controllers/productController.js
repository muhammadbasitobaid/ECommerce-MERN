const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Api = require("../utils/Api");

//! create a new product -- only Admin
exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultsPerPage = 2;
  const productCount = await Product.countDocuments();
  console.log(productCount);
  const apiObj = new Api(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiObj.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//get product details
exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler(500, "Product not found"));

  res.status(200).json({
    success: true,
    product,
  });
};

//! update product --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler(500, "Product not found"));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//! delete a product --Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler(500, "Product not found"));

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product successfully removed",
  });
});
