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
    const idToDelete = "676f61bcd0421bc5e54c945e";

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
