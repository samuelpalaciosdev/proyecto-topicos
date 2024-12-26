import request from "supertest";
import app from "../index";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

// Ref: ver si puedo hacer esto con lo que tengo en db/
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_DB, MONGO_HOSTNAME } =
  process.env;

const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

describe("GET api/chistes?fuente=$parametro", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
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
});
