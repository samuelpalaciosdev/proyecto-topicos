import request from "supertest";
import app from "../index";

interface ChuckJokeResponse {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

const mockupResponseChuck: ChuckJokeResponse = {
  categories: [],
  created_at: "2020-01-05 13:42:26.766831",
  icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
  id: "sX-YjxISRmKwI5HG_as1Rw",
  updated_at: "2020-01-05 13:42:26.766831",
  url: "https://api.chucknorris.io/jokes/sX-YjxISRmKwI5HG_as1Rw",
  value:
    "You know how the old saying goes: You can take the boy out of Texas, but you can't stop Chuck Norris from killing you. And that boy.",
};

global.fetch = jest.fn();

describe("GET api/chiste/${parametro}", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Resetear mocks antes de cada test
  });

  afterAll(() => {
    jest.resetAllMocks(); // Resetear luego de los tests
  });

  it("GET api/chiste/chuck Debería traer un chiste de la api de chuck", async () => {
    // Crea un mock del fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockupResponseChuck,
    });

    const response = await request(app).get("/api/chiste/chuck");

    expect(response.status).toBe(200); // Espero que el estatus sea ok

    // Propiedas del objeto de la respuesta mock
    const keys = Object.keys(mockupResponseChuck) as Array<
      keyof typeof mockupResponseChuck
    >;

    /*
    keys.forEach((key) => {
      console.log(key);
    }); */

    // La respuesta de la api debe tener estos campos
    keys.forEach((key) => {
      expect(response.body).toHaveProperty(key); // categories, created_at...
    });

    // // La respuesta de la api debe tener estos campos
    // expect(response.body).toHaveProperty('categories');
    // expect(response.body).toHaveProperty('created_at');
    // expect(response.body).toHaveProperty('icon_url');
    // expect(response.body).toHaveProperty('id');
    // expect(response.body).toHaveProperty('updated_at');
    // expect(response.body).toHaveProperty('url');
    // expect(response.body).toHaveProperty('value');

    // Comprobar si se llamó a la api de
    expect(fetch).toHaveBeenCalledWith(
      "https://api.chucknorris.io/jokes/random",
    );
  });
});
