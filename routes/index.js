const express = require("express");
const authController = require("./../controllers/authController");

const app = express();

const authRoutes = require("./authRoutes");
app.use("/auth", authRoutes);

const productRoutes = require("./productRoutes");
app.use("/product", authController.verifyToken, productRoutes);

const cartRoutes = require("./cartRoutes");
app.use(
  "/cart",
  authController.verifyToken,
  authController.protect,
  cartRoutes
);

const orderRoutes = require("./orderRoutes");
app.use(
  "/order",
  authController.verifyToken,
  authController.protect,
  orderRoutes
);

module.exports = app;
