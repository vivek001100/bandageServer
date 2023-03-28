const orderDetailsModel = require("../models/orderModel");
const cartModel = require("./../models/cartModel");
const { v4: uuidv4 } = require("uuid");
exports.placeOrder = async (req, res, next) => {
  const userId = req.user.id;
  const { totalAmount } = await cartModel.getTotalAmount(userId);
  const id = uuidv4();
  const createdAt = Date.now();
  const rowFields = {
    id,
    userId,
    amount: totalAmount,
    createdAt,
    orderStatus: "pending",
    paymentStatus: "pending",
  };
  const rowCount = orderDetailsModel.postUserOrderDetails(rowFields);
  if (rowCount) {
    await cartModel.deleteAllCartByUserId(userId);
    res.status(201).json({ status: "success", orderId: id });
  } else {
    res.status(501).json({ status: "fail", message: "failed to place order" });
  }
};
