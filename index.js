const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { agregarFavorito, eliminarFavorito, obtenerFavoritosUsuario } = require("./controllers/favoritos");
const { verificarUsuario, obtenerDatosUsuario, agregarUsuario, eliminarUsuario } = require("./controllers/usuarios");
const { obtenerTodasLasPublicaciones, obtenerPublicacionPorId, crearNuevaPublicacion, borrarPublicacionPorId } = require("./controllers/productos");

const app = express();

const PORT = 3000;

app.listen(PORT, console.log(`¡Servidor ${PORT} encendido!`));
app.use(express.json());
app.use(cors());