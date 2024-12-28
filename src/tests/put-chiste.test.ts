import request from "supertest";
import app from "../index";
import Chiste from "../models/chiste-model";

import { connectDb, disconnectDb } from "../db/connect";

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
      categoria: "dad joke",
    };

    const response = await request(app)
      .put(`/api/chistes/${primerChiste._id}`)
      .send(testChiste);

    expect(response.status).toBe(201);
    // Mensaje de retorno
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        chiste: expect.objectContaining({
          acknowledged: true,
          modifiedCount: expect.any(Number),
        }),
      })
    );
  });
});
