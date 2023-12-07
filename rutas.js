const express = require("express");
const rutas = express.routes;
const { agregarFavorito, eliminarFavorito, obtenerFavoritosUsuario } = require("./controllers/favoritos");
const { verificarUsuario, obtenerDatosUsuario, agregarUsuario, eliminarUsuario } = require("./controllers/usuarios");
const { obtenerTodasLasPublicaciones, obtenerPublicacionPorId, crearNuevaPublicacion, borrarPublicacionPorId } = require("./controllers/productos");



rutas.get("/", verificarToken, cors(), async (req, res) => {
    try {
      const Authorization = req.header("Authorization");
      const token = Authorization.split("Bearer ")[1];
      const { email } = jwt.decode(token);
      const usuario = await obtenerDatosUsuario(email);
      res.send(usuario);
    } catch (error) {
      res.status(500).send(error);
      console.log("no es posible ejecutar el requerimiento");
    }
  });


rutas.post(
  "/login",
  chequearCredenciales,
  reportarSolicitudes,
  cors(),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      await verificarUsuario(email, password);
      const token = jwt.sign({ email }, "mercadito69");
      // console.log(`este es el token: ${token}`);
      res.send(token);
    } catch (error) {
      res.status(500).send(error);
      console.log("no es posible ejecutar el requerimiento");
    }
  }
);

rutas.get("/perfil", verificarToken, cors(), async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    const { email } = jwt.decode(token);
    const usuario = await obtenerDatosUsuario(email);
    res.send(usuario);
  } catch (error) {
    res.status(500).send(error);
    console.log("no es posible ejecutar el requerimiento");
  }
});

rutas.post(
  "/registro",
  reportarSolicitudesRegistro,
  cors(),
  async (req, res) => {
    try {
      const { email, password, rol, lenguage } = req.body;
      //console.log(req.body);
      await agregarUsuario(email, password, rol, lenguage);
      res.send("Usuario creado con exito");
    } catch (error) {
      res.status(500).send(error);
      console.log("no es posible ejecutar el requerimiento");
    }
  }
);

module.exports = rutas