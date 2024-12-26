import "dotenv/config"; // Carga variables locales del .env

import express from "express";
import ChistesRouter from "./routes/chiste-routes";

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/api/chistes", ChistesRouter);

export default app;
