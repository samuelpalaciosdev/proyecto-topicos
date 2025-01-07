import request from "supertest";
import app from "../index";
import Chiste from "../models/chiste-model";

import { connectDb, disconnectDb } from "../db/connect";
import { CategoriaChiste } from "../validations/enums";

// 3. Actualizar chiste dado el id
describe("PUT api/chistes/:id", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("Debería modificar un chiste en la DB", async () => {
    // Traigo el primer chiste
    const primerChiste = await Chiste.findOne({});

    if (!primerChiste) {
      console.error("No hay chistes disponibles en la DB.");
      return;
    }

    const testChiste = {
      id: primerChiste._id,
      texto: "Un chiste de prueba para PUTTT",
      autor: "Prueba Inicial",
      puntaje: 5,
      categoria: CategoriaChiste.Malo, // "malo"
    };

    const response = await request(app)
      .put(`/api/chistes/${primerChiste._id}`)
      .send(testChiste);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        chiste: expect.objectContaining({
          _id: expect.any(String),
          texto: testChiste.texto,
          categoria: testChiste.categoria,
        }),
      })
    );
  });

  it("Debería dar error, ya que el id es inválido", async () => {
    const chisteId = "12345678";
    // Traigo el primer chiste
    const primerChiste = await Chiste.findOne({});

    if (!primerChiste) {
      console.error("No hay chistes disponibles en la DB.");
      return;
    }

    const testChiste = {
      id: chisteId,
      texto: "Digan hipopotamo sin hi y si tamo",
      autor: "pepito",
      puntaje: 2,
      categoria: CategoriaChiste.Malo, // "malo"
    };

    const response = await request(app)
      .put(`/api/chistes/${chisteId}`)
      .send(testChiste);

    expect(response.status).toBe(400); // Espero que el estatus sea de error
    // Expect propiedades
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("success");
  });
});
