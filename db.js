//acceso a la base de datos 
const { Pool } = require("pg");

const pool = new Pool({
  host: "dpg-cm34cjocmk4c73c9qmfg-a",
  port: 5432,
  user: "admin",
  password: "EK6pzrqAqthT1tYE5gPMQ5KRLLR88Kxr", //"Knight123"
  database: "market_place_isof",
  allowExitOnIdle: true,
});

module.exports = {pool};