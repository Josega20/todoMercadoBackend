const express = require("express");
const cors = require("cors");
const { agregarFavorito, eliminarFavorito, obtenerFavoritosUsuario } = require("./controllers/favoritos");
const { verificarUsuario, obtenerDatosUsuario, agregarUsuario, eliminarUsuario } = require("./controllers/usuarios");
const { obtenerTodasLasPublicaciones, obtenerPublicacionPorId, crearNuevaPublicacion, borrarPublicacionPorId } = require("./controllers/productos");


// Middleware CORS
rutas.use(cors());

// Ruta para obtener todas las publicaciones (solo imagen, precio y nombre)
rutas.get("/", async (req, res) => {
  try {
    // Obtener todas las publicaciones
    const publicaciones = await obtenerTodasLasPublicaciones();

    // Filtrar la respuesta para incluir solo la imagen, precio y nombre
    const publicacionesFiltradas = publicaciones.map(({ url, precio, nombre_producto }) => ({
      url,
      precio,
      nombre_producto,
    }));

    // Enviar la respuesta
    res.json(publicacionesFiltradas);
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Otras rutas relacionadas con usuarios, favoritos, etc.

module.exports = rutas;
  

module.exports = rutas