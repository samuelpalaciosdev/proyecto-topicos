import request from "supertest";
import app from "../index";
import { connectDb, disconnectDb } from "../db/connect";
import Chiste from "../models/chiste-model";

// 1. Obtener Chiste por parámetro URL
describe("GET api/chistes/fuente/:fuente", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  // Fuente chuck norris jokes
  it("GET api/chistes/fuente/chuck Debería traer un chiste de la api de chuck jokes", async () => {
    const response = await request(app).get("/api/chistes/fuente/chuck");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades esenciales
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("url");
  });

  // Fuente dad jokes
  it("GET api/chistes/fuente/dad Debería traer un chiste de la api de dad jokes", async () => {
    const response = await request(app).get("/api/chistes/fuente/dad");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("joke");
    expect(response.body).toHaveProperty("status");
  });

  // Fuente propio (base de datos )
  it("GET api/chistes/fuente/propio Debería traer un chiste de la db", async () => {
    const response = await request(app).get("/api/chistes/fuente/propio");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("texto");
    expect(response.body).toHaveProperty("categoria");
  });

  // Fuente inválida
  it("GET api/chistes/fuente/asdf Debería dar error, ya que la fuente no es válida", async () => {
    const response = await request(app).get("/api/chistes/fuente/asdf");

    expect(response.status).toBe(400); // Espero que el estatus sea de error
    // Expect propiedades
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("success");
  });
});

// 5. Obtener chiste de la db por id
describe("GET api/chistes/:id", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("Debería traer el chiste con el respectivo id de la db", async () => {
    // Trae el primer chiste de la db
    const primerChiste = await Chiste.findOne({});
    // Si no existe un chist en la db fail
    if (!primerChiste) {
      console.error(
        "No hay chistes en la base de datos, por favor crea uno para pasar el test",
      );
      return;
    }
    const response = await request(app).get(`/api/chistes/${primerChiste._id}`);

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades esenciales
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("texto");
    expect(response.body).toHaveProperty("puntaje");
  });
});

// 6. Get chistes de la db por categoria y su cantidad
describe("GET api/chistes?categoria=$categoria", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  // Dad
  it("GET api/chistes/categoria=dad-joke Debería traer la cantidad de chistes con categoria dad joke", async () => {
    const categoria = "dad-joke";
    const response = await request(app).get(
      `/api/chistes?categoria=${categoria}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        chistesCategoria: expect.any(Array),
        cantidad: expect.any(Number),
      }),
    ); // Debería traerme un array
  });

  // Humor Negro
  it("GET api/chistes/categoria=humor-negro Debería traer la cantidad de chistes con categoria humor negro", async () => {
    const categoria = `humor-negro`;
    const response = await request(app).get(
      `/api/chistes?categoria=${categoria}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        chistesCategoria: expect.any(Array),
        cantidad: expect.any(Number),
      }),
    ); // Debería traerme un array
  });

  // Chistoso
  it("GET api/chistes/categoria=chistoso Debería traer la cantidad de chistes con categoria chistoso", async () => {
    const categoria = `chistoso`;
    const response = await request(app).get(
      `/api/chistes?categoria=${categoria}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        chistesCategoria: expect.any(Array),
        cantidad: expect.any(Number),
      }),
    ); // Debería traerme un array
  });

  // Categoría no válida
  it("GET api/chistes/categoria=asdf Debería dar error, ya que la categoria no es válida", async () => {
    const categoria = `asdf`;
    const response = await request(app).get(
      `/api/chistes?categoria=${categoria}`,
    );
    expect(response.status).toBe(400); // Espero que el estatus sea de error
    // Expect propiedades
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("success");
  });
});

// 7. Get chistes de la db por puntaje
describe("GET api/chistes?puntaje=$num", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("Debería traer todos los chistes con cierto puntaje de la db", async () => {
    const puntajeNum = 5;
    const response = await request(app).get(
      `/api/chistes?puntaje=${puntajeNum}`,
    );

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades esenciales
    expect(response.body).toBeInstanceOf(Array); // Debería traerme un array
  });
  // Puntaje inválido
  it("Debería dar un error ya que el puntaje no es válido, es mayor a 10 o menor que 1", async () => {
    const puntajeNum = 12;
    const response = await request(app).get(
      `/api/chistes?puntaje=${puntajeNum}`,
    );

    expect(response.status).toBe(400); // Espero que el estatus sea de error
    // Expect propiedades
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("success");
  });
});
