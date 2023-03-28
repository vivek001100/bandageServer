const { knexBandage: db } = require("./../libraries/psql");

exports.saveUser = (newUser) => {
  return db("users")
    .insert(newUser)
    .then((result) => result.rowCount)
    .catch((e) => null);
};

exports.getUser = (queryField) => {
  return db("users")
    .select("*")
    .where(queryField)
    .then((result) => {
      if (result.length) return result[0];
      else null;
    });
};
