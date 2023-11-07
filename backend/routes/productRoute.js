const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticated } = require("../middleware/auth");

router.route("/products").get(isAuthenticated, getAllProducts);
router.route("/product").post(createProduct);
router
  .route("/product/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
