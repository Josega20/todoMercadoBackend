const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {
  chequearCredenciales,
  verificarToken,
  reportarSolicitudes,
  reportarSolicitudesRegistro,
} = require("./middlewares/middlewares");
const app = express();
const PORT = 3000;
app.listen(PORT, console.log(`¡Servidor ${PORT} encendido!`));
app.use(express.json());
app.use(cors());
const {
  verificarUsuario,
  obtenerDatosUsuario,
  agregarUsuario,
  deleteUsuario,
  modificarPassword,
} = require("./controllers/usuarios.js");
const {
  obtenerPublicaciones,
  crearNuevaPublicacion,
} = require("./controllers/productos");

app.post("/registro", reportarSolicitudesRegistro, cors(), async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    console.log(req.body);
    await agregarUsuario(nombre, email, password, telefono);
    res.send("Usuario creado con exito");
  } catch (error) {
    res.status(500).send(error);
    console.log("no es posible ejecutar el requerimiento");
  }
});
app.post(
  "/login",
  chequearCredenciales,
  reportarSolicitudes,
  cors(),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      await verificarUsuario(email, password);
      const token = jwt.sign({ email }, "market23");
      console.log(`este es el token: ${token}`);
      res.send(token);
    } catch (error) {
      res.status(500).send(error);
      console.log("no es posible ejecutar el requerimiento");
    }
  }
);

app.get("/perfil", verificarToken, cors(), async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    console.log(Authorization);
    const token = Authorization.split("Bearer ")[1];
    console.log(token);
    const { email } = jwt.decode(token);

    //const { email } = req.body;
    console.log(email);
    const usuario = await obtenerDatosUsuario(email);
    res.send(usuario);
  } catch (error) {
    res.status(500).send(error);
    console.log("no es posible ejecutar el requerimiento");
  }
});

app.delete("/perfil", verificarToken, cors(), async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    const { email } = jwt.decode(token);
    //const {email} = req.query
    const usuario = await deleteUsuario(email);
    res.send("usuario borrado");
  } catch (error) {
    res.status(500).send(error);
    console.log("no es posible ejecutar el requerimiento");
  }
});

app.patch(
  "/pefil" /*verificarToken,
  reportarSolicitudes,*/,
  cors(),
  async (req, res) => {
    try {
      const { password, newpassword } = req.body;
      console.log(newpassword);
      const Authorization = req.header("Authorization");
      const token = Authorization.split("Bearer ")[1];
      const { email } = jwt.decode(token);
      //const {email} = req.query
      console.log(email);
      await verificarUsuario(email, password);
      const usuario = await modificarPassword(email, newpassword);
      res.send("password modificado con exito");
    } catch (error) {
      res.status(500).send(error);
      console.log("no es posible ejecutar el requerimiento");
    }
  }
);

// productos
app.get("/", cors(), async (req, res) => {
  try {
    const productos = await obtenerPublicaciones();
    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
    console.log("no es posible ejecutar el requerimiento");
  }
});

app.post("/publicaciones/:id", cors(), async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const id_usuario = id
    console.log(id_usuario);
    const { nombre_producto, descripcion, precio, url } = req.body;

    console.log(req.body);
    await crearNuevaPublicacion(
      nombre_producto,
      descripcion,
      precio,
      id_usuario,
      url
    );
    res.send("producto creado con exito");
  } catch (error) {
    res.status(500).send(error);
    console.log("no es posible ejecutar el requerimiento");
  }
});
