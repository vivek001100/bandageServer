const express = require("express");
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.post("/add", cartController.addToCart);

router.get("/products", cartController.getCartProducts);
router.get("/total", cartController.getTotalAmount);
router.post("/update", cartController.updateCartQuantity);
router.post("/delete", cartController.deleteCartProduct);

module.exports = router;
