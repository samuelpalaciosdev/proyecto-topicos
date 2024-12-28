import request from "supertest";
import app from "../index";

import { connectDb, disconnectDb } from "../db/connect";
import { ChisteType } from "../validations/chiste-schema";
import { CategoriaChiste } from "../validations/enums";

// 2. Crear chiste
describe("POST api/chistes", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("Debería crear un chiste en la db", async () => {
    const chiste: ChisteType = {
      texto: "Un pana, con 2 panas, un tercer pana, wao 3 panas",
      puntaje: 3,
      categoria: CategoriaChiste.HumorNegro, // humor-negro
    };

    const response = await request(app).post("/api/chistes").send(chiste);

    expect(response.status).toBe(201); // Espero que el estatus sea creado
    // Expect propiedades esenciales
    expect(response.body.chiste.puntaje).toBe(chiste.puntaje);
    expect(response.body.chiste.texto).toBe(chiste.texto);
  });
});
