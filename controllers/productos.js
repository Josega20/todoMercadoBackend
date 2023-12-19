//consultas a la base datos para el producto
const { pool } = require("../db");

//obtener todas la publicaciones
const obtenerPublicaciones = async ({
  limits = 8,
  campo = "id_producto",
  orden="ASC",
  page = 1,
}) => {
 // const [campo, orden] = order_by.split("_");
  const offset = (page - 1) * limits;
console.log(campo);
  let consulta = `SELECT * FROM productos ORDER BY ${campo}  ${orden} LIMIT $1 OFFSET ${offset}`;
  console.log(consulta);
  const { rows: productos, rowCount } = await pool.query(consulta, [limits]);
  console.log(productos);
  return productos;
};

//ver la descrpcion de una publicacion
const obtenerPublicacionPorId = async (idProducto) => {
  const consulta = "SELECT * FROM productos WHERE id_producto = $1";
  const {
    rows: [publicacion],
    rowCount,
  } = await pool.query(consulta, [idProducto]);
  return publicacion;
};

//Obtiene las publicaciones del usuario
const obtenerPublicacionUsuario = async (id_usuario) => {
    const consulta = "SELECT * FROM productos WHERE id_usuario = $1";
    const {
      rows: publicacion,
      rowCount,
    } = await pool.query(consulta, [id_usuario]);
    return publicacion;
  };

//crear una nueva publicacion
const crearNuevaPublicacion = async (
  nombreProducto,
  descripcion,
  precio,
  idUsuario,
  url
) => {
  const consulta = "INSERT INTO productos  VALUES (default,$1, $2, $3, $4, $5)";

  const values = [nombreProducto, descripcion, precio, idUsuario, url];
  console.log(values);
  const {
    rows: [nuevaPublicacion],
  } = await pool.query(consulta, values);
  return nuevaPublicacion;
};

//borrar una publicacion
const borrarPublicacionPorId = async (idProducto) => {
  const consulta = "DELETE FROM productos WHERE id_producto = $1";
  const {
    rows: [publicacionBorrada],
    rowCount,
  } = await pool.query(consulta, [idProducto]);
  return publicacionBorrada;
};

//modificar publicacion
const modificarPublicacion = async (
  nombreProducto,
  descripcion,
  precio,
  url
) => {
  const consulta =
    "UPDATE productos  SET nombre_producto=$1, descripcion=$2, precio=$3, url= $4)";

  const values = [nombreProducto, descripcion, precio, url];
  console.log(values);
  const {
    rows: [Publicacion],
  } = await pool.query(consulta, values);
  return Publicacion;
};

//filtrar busqueda
const obtenerProductoFiltros = async ({ precio_max, precio_min }) => {
  let filtros = [];
  const values = [];
  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };
  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  let consulta = "SELECT * FROM productos";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }
  const { rows: productos } = await pool.query(consulta, values);
  return productos;
};
module.exports = {
  obtenerPublicaciones,
  obtenerPublicacionPorId,
  obtenerPublicacionUsuario,
  crearNuevaPublicacion,
  borrarPublicacionPorId,
  modificarPublicacion,
  obtenerProductoFiltros,
};
