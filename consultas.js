const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "xxxxxx", //"Knight123"
  database: "market_place",
  allowExitOnIdle: true,
});

module.exports = {pool};