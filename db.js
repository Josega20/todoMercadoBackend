//acceso a la base de datos 
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Knight123", //"Knight123"
  database: "market_place",
  allowExitOnIdle: true,
});

module.exports = {pool};