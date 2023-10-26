const Product = require("../models/productModel");

// create a new product -- only Admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: `product not created, ${error}`,
      success: false,
    });
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: `unable to get the product, ${error}`,
      success: false,
    });
  }
};

//get product details
exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      message: "Product not found",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// update product
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      message: "Product not found",
      success: false,
    });
  }

  try {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Product not update, ${error}`,
      success: false,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(500).json({
        message: "Product not found",
        success: false,
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product successfully removed",
    });
  } catch (error) {
    res.status(500).json({
      message: `Product not deleted, ${error}`,
      success: false,
    });
  }
};
