const bcrypt = require("bcryptjs");
const { pool } = require("../db")

//verifica el usuario y lo valida 
const verificarUsuario = async (email, password) => {
  const consulta = "SELECT * FROM usuarios where email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, [email]);
  const { password: passwordEncriptada } = usuario;
  const passwordCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordCorrecta || !rowCount) {
    throw { code: 401, message: "Usuario o contraseña incorrecto" };
  }
};
const obtenerDatosUsuario = async (email) => {
  const consulta = "SELECT * FROM usuarios where email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, [email]);
  const { password: passwordEncriptada } = usuario;
  if (!rowCount) {
    throw { code: 404, message: "usuario no encontrado" };
  }
  delete usuario.password;
  return usuario;
};

const agregarUsuario = async (nombre, email, password, telefono) => {
  const passwordEncriptada = bcrypt.hashSync(password);
  console.log(passwordEncriptada);
  const values = [nombre, email, passwordEncriptada, telefono];
  const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
  try {
    await pool.query(consulta, values);
} catch (error) {
    console.error("Error during user insertion:", error);
    throw error;
}

 // console.log(consulta);
  //await pool.query(consulta, values);
};

module.exports = { verificarUsuario, obtenerDatosUsuario, agregarUsuario };
