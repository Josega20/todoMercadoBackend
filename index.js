const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const {
    verificarUsuario,
    obtenerDatosUsuario,
    agregarUsuario,
  } = require("./consultas.js");
  const{chequearCredenciales, verificarToken,reportarSolicitudes, reportarSolicitudesRegistro} =require ("./middlewares")
  const app = express();
  const PORT = 3000;
  app.listen(PORT, console.log(`¡Servidor ${PORT} encendido!`));
  app.use(express.json());
  app.use(cors());