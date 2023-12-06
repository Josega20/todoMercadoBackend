//consultas a la base datos para el usuario

const bcrypt = require("bcryptjs");
const { pool } = require("../db");

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
    throw { code: 401, message: "Usuario o contraseña incorrecto" }
  }
};

//obetiene los datos del usuario
const obtenerDatosUsuario = async (email) => {
  const consulta = "SELECT * FROM usuarios where email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, [email]);
  const { password: passwordEncriptada } = usuario;
  if (!rowCount) {
    throw { code: 404, message: "usuario no encontrado" }
  }
  delete usuario.password;
  return usuario;
};

//se agrega un nuevo usuario
const agregarUsuario = async (nombre, email, password, telefono) => {
  // Verificar si el correo ya existe
  const verificarCorreo = "SELECT * FROM usuarios WHERE email = $1";
  const { rowCount: existeCorreo } = await pool.query(verificarCorreo, [email]);

  if (existeCorreo > 0) { //si existe un correo es mayor a 0 lanza el error
    // El correo ya está registrado
    throw { code: 409, message: "El correo ya está registrado" };//creo que este es el codigo
  }

  const passwordEncriptada = bcrypt.hashSync(password)
  const values = [nombre, email, passwordEncriptada, telefono]
  const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
  await pool.query(consulta, values);
}

//funcion para eliminar un usuario
const eliminarUsuario = async (email) => {
  const eliminarUsuarioQuery = "DELETE FROM usuarios WHERE email = $1";
  await pool.query(eliminarUsuarioQuery, [email]);
};

module.exports = { 
verificarUsuario, 
obtenerDatosUsuario, 
agregarUsuario, 
eliminarUsuario, 
};