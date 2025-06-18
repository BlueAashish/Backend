const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/auth.middleware");
const { productValidation } = require("../middleware/validation.middleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", [auth, adminOnly, productValidation.create], createProduct);

router.put("/:id", [auth, adminOnly, productValidation.update], updateProduct);

router.delete("/:id", [auth, adminOnly], deleteProduct);

module.exports = router;
