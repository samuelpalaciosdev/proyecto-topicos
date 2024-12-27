import request from "supertest";
import app from "../index";
import { connectDb, disconnectDb } from "../db/connect";
import Chiste from "../models/chiste-model";

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

describe("GET api/chistes?puntaje=$num", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("Debería traer todos los chistes con cierto puntaje de la db", async () => {
    const puntajeNum = 6;
    const response = await request(app).get(
      `/api/chistes?puntaje=${puntajeNum}`,
    );

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades esenciales
    expect(response.body).toBeInstanceOf(Array); // Debería traerme un array
  });
});
