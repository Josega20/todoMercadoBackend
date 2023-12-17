//consultas a la base datos para el producto
const { pool } = require("../db")

//obtener todas la publicaciones
const obtenerPublicaciones = async () => {
    const consulta = "SELECT * FROM productos";
    console.log(consulta)
    const { rows: publicaciones, rowCount } = await pool.query(consulta);
    return publicaciones;
};

//ver todas las publicaciones del usuario
const obtenerPublicacionUsuario = async (id_usuario) => {
    const consulta = "SELECT * FROM productos WHERE id_usuario = $1;";
    const { rows: [publicacion], rowCount } = await pool.query(consulta, [id_usuario]);
    return publicacion;
};

//ver la descrpcion de una publicacion
const obtenerPublicacionPorId = async (idProducto) => {
    const consulta = "SELECT * FROM productos WHERE id_producto = $1";
    const { rows: [publicacion], rowCount } = await pool.query(consulta, [idProducto]);
    return publicacion;
};

//crear una nueva publicacion
const crearNuevaPublicacion = async (nombreProducto, descripcion, precio, idUsuario, url) => {
    const consulta = "INSERT INTO productos  VALUES (default,$1, $2, $3, $4, $5)";

    const values = [nombreProducto, descripcion, precio, idUsuario, url]
    console.log(values)
    const { rows: [nuevaPublicacion] } = await pool.query(consulta, values);
    return nuevaPublicacion;
};

//borrar una publicacion
const borrarPublicacionPorId = async (idProducto) => {
    const consulta = "DELETE FROM productos WHERE id_producto = $1";
    const { rows: [publicacionBorrada], rowCount } = await pool.query(consulta, [idProducto]);
    return publicacionBorrada;
};

//modificar publicacion
const modificarPublicacion = async (nombreProducto, descripcion, precio, url) => {
    const consulta = "UPDATE productos  SET nombre_producto=$1, descripcion=$2, precio=$3, url= $4)";

    const values = [nombreProducto, descripcion, precio, url]
    console.log(values)
    const { rows: [Publicacion] } = await pool.query(consulta, values);
    return Publicacion;
};
module.exports = {
    obtenerPublicaciones,
    obtenerPublicacionPorId,
    crearNuevaPublicacion,
    borrarPublicacionPorId,
    modificarPublicacion,
    obtenerPublicacionUsuario
};