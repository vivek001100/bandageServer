const { knexBandage: db } = require("./../libraries/psql");

exports.postUserOrderDetails = async (rowFields) => {
    return db("order_details")
    .insert(rowFields)
    .then((result) => {
        console.log(result)
       return result.rowCount
    })
    .catch((error) => console.log(error));
}