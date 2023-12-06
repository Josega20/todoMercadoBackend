const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//esta linea queda comentada para que el servidor se levante sin probelmas
// const {
//   verificarUsuario,
//   obtenerDatosUsuario,
//   agregarUsuario,
// } = require("./controller/usuarios.js");

const { chequearCredenciales, verificarToken, reportarSolicitudes, reportarSolicitudesRegistro } = require("./middlewares")

const app = express();

const PORT = 3000;

app.listen(PORT, console.log(`¡Servidor ${PORT} encendido!`));
app.use(express.json());
app.use(cors());