//aqui se realizaran los tests
const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD", () => {
  // Test para la ruta de login
  it("Debería autenticar al usuario y devolver un token", async () => {
    const response = await request(server)
      .post("/login")
      .send({ email: "usuario@test.com", password: "contraseña" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  // Test para la ruta de registro
  it("Debería registrar un nuevo usuario", async () => {
    const response = await request(server)
      .post("/registro")
      .send({
        email: "nuevoUsuario@test.com",
        password: "contraseña",
        rol: "usuario",
        lenguage: "es",
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Usuario creado con exito");
  });

  // Test para la ruta de obtener perfil
  it("Debería obtener el perfil del usuario autenticado", async () => {
    // Simula autenticación y obtención de token
    const authResponse = await request(server)
      .post("/login")
      .send({ email: "usuario@test.com", password: "contraseña" });

    const token = authResponse.body.token;

    // Hace la solicitud para obtener el perfil
    const response = await request(server)
      .get("/perfil")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy(); // Ajusta esto según la estructura de tu respuesta
  });

  // Test para la ruta de eliminar usuario
  it("Debería eliminar un usuario existente", async () => {
    // Simula autenticación y obtención de token
    const authResponse = await request(server)
      .post("/login")
      .send({ email: "usuario@test.com", password: "contraseña" });

    const token = authResponse.body.token;

    // Hace la solicitud para eliminar el usuario
    const response = await request(server)
      .delete("/eliminar-usuario")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});