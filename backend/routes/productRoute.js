const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/products").get(getAllProducts);
router.route("/product").post(createProduct);
router
  .route("/product/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
