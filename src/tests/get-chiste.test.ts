import request from "supertest";
import app from "../index";

import { connectDb, disconnectDb } from "../db/connect";

describe("GET api/chistes?fuente=$parametro", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("GET api/chistes?fuente=chuck Debería traer un chiste de la api de chuck jokes", async () => {
    const response = await request(app).get("/api/chistes?fuente=chuck");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades esenciales
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("url");
  });

  it("GET api/chistes?fuente=dad Debería traer un chiste de la api de dad jokes", async () => {
    const response = await request(app).get("/api/chistes?fuente=dad");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("joke");
    expect(response.body).toHaveProperty("status");
  });

  it("GET api/chistes?fuente=propio Debería traer un chiste de la db", async () => {
    const response = await request(app).get("/api/chistes?fuente=propio");

    expect(response.status).toBe(200); // Espero que el estatus sea ok
    // Expect propiedades
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("texto");
    expect(response.body).toHaveProperty("categoria");
  });
});
