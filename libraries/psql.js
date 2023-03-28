const pg = require("pg");

pg.types.setTypeParser(20, Number);

const knexConfigBandage = {
    client: "postgresql",
    connection: {
      database: "bandage",
      user: "tnluser",
      password: null,
    },
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 2000, // free resources are destroyed after this many milliseconds
      reapIntervalMillis: 1000, // how frequent to check for idle resources to destroy
    },
  };
  
 
  const knexBandage= require("knex")(knexConfigBandage);
  module.exports = {knexBandage};