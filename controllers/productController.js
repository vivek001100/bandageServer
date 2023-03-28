const productModel = require("./../models/productModel");

exports.getProducts = async (req, res, next) => {
  const userId = req.user?.id;
  console.log(userId);
  const products = await productModel.fetchProducts(userId);
  res.status(200).json({
    products,
  });
};

exports.getProductDetail = async (req, res, next) => {
    const id=req.params.id
    const product=await productModel.fetchProductsById(id)
    res.status(200).json({
        product,
      });
};
