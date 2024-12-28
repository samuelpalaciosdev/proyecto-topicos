import "dotenv/config"; // Carga variables locales del .env

import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import path from "path";
import ChistesRouter from "./routes/chiste-routes";

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false }));

// API Ruotes
app.use("/api/chistes", ChistesRouter);

export default app;
