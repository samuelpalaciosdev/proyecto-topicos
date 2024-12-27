import request from "supertest";
import app from "../index";

import { connectDb, disconnectDb } from "../db/connect";
import { ChisteType } from "../validations/chiste-schema";

describe("PUT api/chistes", () => {
    beforeAll(async () => {
        await connectDb();
      });
    
      afterAll(async () => {
        await disconnectDb();
      });

      it("Debería modificar un chiste de la DB", async () => {
        const chisteModificado: ChisteType = {
            texto: "Un pana, con 2 panas, un tercer pana, wao 3 panas",
            autor: "Rafael",
            puntaje: 3,
            categoria: "dad joke",        
        };

        const response = await request(app).put("/api/chistes/:id").send(chisteModificado);

        console.log(chisteModificado);

        expect(response.status).toBe(201);
        expect(response.body.chisteModificado.acknowledged).toBe(true)
      })
})