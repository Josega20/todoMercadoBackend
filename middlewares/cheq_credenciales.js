const chequearCredenciales = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send({ message: "Faltan credenciales en la consulta" });
    }
    next();
  };
  module.export= chequearCredenciales;