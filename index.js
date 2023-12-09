const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
//const{chequearCredenciales, verificarToken,reportarSolicitudes, reportarSolicitudesRegistro} =require ("./middlewares")
const app = express();
const PORT = 3000;
app.listen(PORT, console.log(`¡Servidor ${PORT} encendido!`));
app.use(express.json());
app.use(cors());
const {
  verificarUsuario,
  obtenerDatosUsuario,
  agregarUsuario,
} = require("./controllers/usuarios.js");

app.post("/registro",/*reportarSolicitudesRegistro,*/ cors(), async (req, res) => {
  try {
    const {nombre,email, password, telefono} = req.body;
    console.log(req.body);
    await agregarUsuario(nombre,email, password, telefono);
    res.send("Usuario creado con exito");
  } catch (error) {
    res.status(500).send(error);
    console.log("no es posible ejecutar el requerimiento");
  }
});
