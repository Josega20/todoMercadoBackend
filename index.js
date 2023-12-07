const express = require("express");
const jwt = require("jsonwebtoken");
const rutas = require("./rutas.js")
const cors = require("cors");
const app = express();
const PORT = 3000;
app.listen(PORT, console.log(`¡Servidor ${PORT} encendido!`));
app.use(express.json());
app.use(cors());
app,use(rutas)
