const { pool } = require("../db");

//guardar favoritos 
//creo que seria asi la sintaxis no la e comprobado
const agregarFavorito = async (idUsuario, idProducto) => {
    const agregarFavoritoQuery = "INSERT INTO favoritos (id_usuario, id_producto) VALUES ($1, $2)";
    await pool.query(agregarFavoritoQuery, [idUsuario, idProducto]);
  };
  
  //eliminar favoritos
  const eliminarFavorito = async (idUsuario, idProducto) => {
    const eliminarFavoritoQuery = "DELETE FROM favoritos WHERE id_usuario = $1 AND id_producto = $2";
    const { rowCount } = await pool.query(eliminarFavoritoQuery, [idUsuario, idProducto]);
  };
  
  //Obtener Favoritos de un usuario
  const obtenerFavoritosUsuario = async (idUsuario) => {
    const obtenerFavoritosQuery = "SELECT * FROM favoritos WHERE id_usuario = $1";
    const { rows: favoritos, rowCount } = await pool.query(obtenerFavoritosQuery, [idUsuario]);
    return favoritos;
  };
  
  module.exports = { 
  agregarFavorito, 
  eliminarFavorito,
  obtenerFavoritosUsuario 
  };