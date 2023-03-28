const { knexBandage: db } = require("./../libraries/psql");

exports.addToCart = (rowFields) => {
  return db("cart_details")
    .insert(rowFields)
    .then((row) => row.rowCount)
    .catch((e) => null);
};

exports.fetchCartProducts = (userId) => {
  return db
    .select("*")
    .from("products")
    .innerJoin("cart_details", function () {
      this.on("products.id", "=", "cart_details.productId").onIn(
        "cart_details.userId",
        [userId]
      );
    });
};

exports.getTotalAmount = (userId) => {
  return db("cart_details")
    .sum("amount as totalAmount")
    .where({ userId })
    .first();
};

exports.updateCartQuantity = (quantity, userId, productId,amount) => {
  return db("cart_details").update({ quantity }).where({
    userId,
    productId,
  });
};

exports.deleteCartProduct = (userId, productId) => {
  return db("cart_details").where({ userId, productId }).del();
};

exports.deleteAllCartByUserId=(userId)=>{
  return db("cart_details").where({ userId }).del();
    
}



