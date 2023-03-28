const cartModel = require("./../models/cartModel");
const productModel = require("./../models/productModel")

exports.addToCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.id;
  const createdAt = Math.floor(new Date() / 1000);

  const product = await productModel.fetchProductPriceById(productId)
  const newCartDetailField = {
    productId,
    userId,
    amount : product.price,
    quantity: 1,
    createdAt,
  };
  //   console.log(newCartDetailField)

  const rowCount = await cartModel.addToCart(newCartDetailField);
  if (rowCount) {
    res.status(201).json({
      status: "success",
    });
  } else {
    res.status(405).json({
      status: "fail",
      message: "product already exist in cart",
    });
  }
};

exports.getCartProducts = async (req, res, next) => {
    console.log(req.user)
  const cartProducts = await cartModel.fetchCartProducts(req.user.id);

  res.status(200).json({
    cartProducts,
  });
};

exports.getTotalAmount = async (req, res, next) => {
  const totalAmount = await cartModel.getTotalAmount(req.user.id);

  res.status(200).json(totalAmount);
};

exports.updateCartQuantity = async (req, res, next) => {
  const { quantity, productId } = req.body;
  const product = await productModel.fetchProductPriceById(productId);

  const rowCount = await cartModel.updateCartQuantity(
    quantity,
    req.user.id,
    productId,
    product.price*quantity
  );
  console.log(rowCount);
  if (rowCount) {
    res.status(202).json({
      status: "success",
    });
  }
};

exports.deleteCartProduct = async (req, res, next) => {
  const { productId } = req.body;
  const rowCount = await cartModel.deleteCartProduct(req.user.id, productId);
  console.log(rowCount);
  if (rowCount) {
    res.status(200).json({
      status: "success",
    });
  }
};
