import request from "supertest";
import app from "../index";
import Chiste from "../models/chiste-model";
import { connectDb, disconnectDb } from "../db/connect";

// 4. Delete chiste de la db by id
describe("DELETE api/chistes/:id", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it("Debería eliminar un chiste de la DB", async () => {
    // Traigo el primer chiste
    const primerChiste = await Chiste.findOne({});

    if (!primerChiste) {
      console.error("No hay chistes disponibles en la DB");
      return;
    }

    const response = await request(app).delete(
      `/api/chistes/${primerChiste._id}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Chiste eliminado de la Base de Datos",
        result: {
          acknowledged: true,
          deletedCount: 1,
        },
        success: true,
      }),
    );
  });
});
