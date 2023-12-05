const bcrypt = require("bcryptjs");

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "xxxxxx",
  database: "todo_mercado",
  allowExitOnIdle: true,
});

const verificarUsuario = async (email, password) => {
  const consulta = "SELECT * FROM usuarios where email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, [email]);
  const { password: passwordEncriptada } = usuario;
  const passwordCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordCorrecta || !rowCount){
    throw {code: 401, message: "Usuario o contraseña incorrecto"}
  }
};
const obtenerDatosUsuario = async (email) =>{
const consulta = "SELECT * FROM usuarios where email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, [email]);
  const { password: passwordEncriptada } = usuario;
   if (!rowCount){
    throw {code: 404, message: "usuario no encontrado"}
  }
  delete usuario.password;
  return usuario;
};

const agregarUsuario = async ( nombre,email, password,telefono) =>{
    const passwordEncriptada = bcrypt.hashSync(password)
    const values = [nombre,email, passwordEncriptada, telefono]
    const consulta= "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
    await pool.query(consulta, values);
}

module.exports = { verificarUsuario, obtenerDatosUsuario, agregarUsuario};