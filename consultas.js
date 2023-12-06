const bcrypt = require("bcryptjs");

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "xxxxxx",
  database: "todo_mercado",
  allowExitOnIdle: true,
});


module.exports = { verificarUsuario, obtenerDatosUsuario, agregarUsuario};