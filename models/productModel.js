const { knexBandage: db } = require("./../libraries/psql");

exports.fetchProducts = (userId) => {
  return db
    .select(
      "products.id",
      "products.price",
      "products.category",
      "products.images[1] as image",
      "products.name",
      "cart_details.productId"
    )
    .from("products")
    .leftOuterJoin("cart_details", function () {
      this.on("products.id", "=", "cart_details.productId").onIn(
        "cart_details.userId",
        [userId]
      );
    });
};
exports.fetchProductsById = (id) => {
  return db("products").select("*").where({ id }).first();
};

exports.fetchProductPriceById = (id) =>{
  return db("products").select("price").where({id}).first();
}