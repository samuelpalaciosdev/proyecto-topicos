import request from "supertest";
import app from "../index";

import { connectDb, disconnectDb } from "../db/connect";
describe("DELETE api/chistes/:id", () => {
    beforeAll(async () => {
      await connectDb();
    });
  
    afterAll(async () => {
      await disconnectDb();
    });
  
    it("Debería eliminar un chiste de la DB", async () => {
      const idToDelete = "676f03c7d091aa4a8989daec";
  
      const response = await request(app).delete(`/api/chistes/${idToDelete}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          acknowledged: true,
          deletedCount: 1,
        })
      );
    });
});
  