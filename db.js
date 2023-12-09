//acceso a la base de datos 
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "16894832_Jg", //"Knight123"
  database: "market_place",
  allowExitOnIdle: true,
});

module.exports = {pool};