const { Pool } = require("pg");

const connection = new Pool({
  user: "postgres",
  host: "localhost",
  database: "trip",
  password: "1234",
  port: "5432",
});

module.exports = connection;