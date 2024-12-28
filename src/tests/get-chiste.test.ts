import request from "supertest";
import app from "../index";
import { connectDb, disconnectDb } from "../db/connect";
import Chiste from "../models/chiste-model";

/**
 * @swagger
 *  1er Get: Obtener Chiste por parámetro URL
 */

describe("GET api/chistes/fuente/:fuente", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("GET api/chistes/fuente/chuck Debería traer un chiste de la api de chuck jokes", async () => {
    const response = await request(app).get("/api/chistes/fuente/chuck");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades esenciales
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("url");
  });

  it("GET api/chistes/fuente/dad Debería traer un chiste de la api de dad jokes", async () => {
    const response = await request(app).get("/api/chistes/fuente/dad");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("joke");
    expect(response.body).toHaveProperty("status");
  });

  it("GET api/chistes/fuente/propio Debería traer un chiste de la db", async () => {
    const response = await request(app).get("/api/chistes/fuente/propio");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("texto");
    expect(response.body).toHaveProperty("categoria");
  });
});

/**
 * @swagger
 *  5to Get: Obtener Chiste por ID
 */

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
        "No hay chistes en la base de datos, por favor crea uno para pasar el test"
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

/**
 * @swagger
 *  6to Get: Obtener cantidad de chistes por su Categoria
 */

describe("GET api/chistes?categoria=$categoria", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  // Dad
  it("GET api/chistes/categoria=dad%20joke Debería traer la cantidad de chistes que hay en Dad", async () => {
    const categoria = `dad%20joke`;
    const response = await request(app).get(
      `/api/chistes?categoria=${categoria}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        chistesCategoria: expect.any(Array),
        cantidad: expect.any(Number),
      })
    ); // Debería traerme un array
  });

  // Humor Negro
  it("GET api/chistes/categoria=humor%20negro Debería traer la cantidad de chistes que hay en Dad", async () => {
    const categoria = `humor%20negro`;
    const response = await request(app).get(
      `/api/chistes?categoria=${categoria}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        chistesCategoria: expect.any(Array),
        cantidad: expect.any(Number),
      })
    ); // Debería traerme un array
  });

  // Chistoso
  it("GET api/chistes/categoria=chistoso Debería traer la cantidad de chistes que hay en Dad", async () => {
    const categoria = `chistoso`;
    const response = await request(app).get(
      `/api/chistes?categoria=${categoria}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        chistesCategoria: expect.any(Array),
        cantidad: expect.any(Number),
      })
    ); // Debería traerme un array
  });
});

/**
 *  7 Get: Puntuaje
 */

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
      `/api/chistes?puntaje=${puntajeNum}`
    );

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades esenciales
    expect(response.body).toBeInstanceOf(Array); // Debería traerme un array
  });
});
