//consultas a la base datos para el producto
const { pool } = require("../db")

//obtener todas la publicaciones
const obtenerTodasLasPublicaciones = async () => {
    const consulta = "SELECT id_producto, nombre_producto, precio, id_usuario, url FROM productos";
    const { rows: publicaciones, rowCount } = await pool.query(consulta);
    return publicaciones;
};

//ver la descrpcion de una publicacion
const obtenerPublicacionPorId = async (idProducto) => {
    const consulta = "SELECT * FROM productos WHERE id_producto = $1";
    const { rows: [publicacion], rowCount } = await pool.query(consulta, [idProducto]);
    return publicacion;
};

//crear una nueva publicacion
const crearNuevaPublicacion = async (nombreProducto, descripcion, precio, idUsuario, url) => {
    const consulta = "INSERT INTO productos (nombre_producto, descripcion, precio, id_usuario, url) VALUES ($1, $2, $3, $4, $5)";
    const { rows: [nuevaPublicacion] } = await pool.query(consulta, [nombreProducto, descripcion, precio, idUsuario, url]);
    return nuevaPublicacion;
};

//borrar una publicacion
const borrarPublicacionPorId = async (idProducto) => {
    const consulta = "DELETE FROM productos WHERE id_producto = $1";
    const { rows: [publicacionBorrada], rowCount } = await pool.query(consulta, [idProducto]);
    return publicacionBorrada;
};

module.exports = {
    obtenerTodasLasPublicaciones,
    obtenerPublicacionPorId,
    crearNuevaPublicacion,
    borrarPublicacionPorId
};