import "dotenv/config"; // Carga variables locales del .env

import express from "express";
import connectDb from "./db/connect";
import Chiste from "./models/chiste-model";
import ChistesRouter from "./routes/chiste-routes";

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/api/chistes", ChistesRouter);

app.get("/", async (_req, res) => {
  const nuevoChiste = await Chiste.create({
    texto:
      "Los mismos problemas de matemática de hace como 80 años, tú los ves y que: Carlitos se perdió en el desierto (un dibujito de un niño riéndose), bueno no se ve tan mal, Carlitos tiene 200ml de agua en dos potes, 100ml en cada pote y Carlitos toma 15ml cada 30min pero Carlitos se tropezó y perdió 45ml de un pote, pero 2 gotas del sudor de Carlitos que equivalen a 5ml caen en el primer pote, si Carlitos... y tú y que: pero qué carajo hace carlitos en el desierto. Ese es el problema de este país estar resolviendo esta vaina en vez de buscar a Carlitos, tiene que estar en Coro es el único sitio donde pude estar",
    autor: "Daniel Pistola",
    puntaje: 8,
    categoria: "chistoso",
  });

  res.json({
    nuevoChiste,
  });
});

// Inicia el servidor
const start = async () => {
  try {
    // await connectDb();
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
