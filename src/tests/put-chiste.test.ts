import request from "supertest";
import app from "../index";

import { connectDb, disconnectDb } from "../db/connect";
import { ChisteType } from "../validations/chiste-schema";

describe("PUT api/chistes/:id", () => {
    let chisteID: string;

    beforeAll(async () => {
        await connectDb();

        const testChiste: ChisteType = {
          texto: "Un chiste de prueba para PUT",
          autor: "Prueba Inicial",
          puntaje: 5,
          categoria: "dad joke",
        };

        const response = await request(app).post("/api/chistes").send(testChiste);
        chisteID = response.body._id;
      });
    
      afterAll(async () => {
        await disconnectDb();
      });

      it("Debería modificar un chiste en la DB", async () => {
        const chisteModificado: Partial<ChisteType> = {
          texto: "Un pana, con 2 panas, un tercer pana, wao 3 panas",
          autor: "Rafael",
          puntaje: 3,
          categoria: "dad joke",
        };


        const response = await request(app)
          .put(`api/chistes/${chisteID}`)
          .send(chisteModificado);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          expect.objectContaining({
            acknowledged: true,
            modifiedCount: 1,
          })
        );

        const verifyResp = await request(app).get(`/api/chistes/${chisteID}`);
        expect(verifyResp.body).toEqual(
          expect.objectContaining({
            _id: chisteID,
            ...chisteModificado,
          })
        );

      })
})