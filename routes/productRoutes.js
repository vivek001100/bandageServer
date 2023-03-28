const express = require("express");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/all", productController.getProducts);
router.get("/:id", productController.getProductDetail);

module.exports = router;
