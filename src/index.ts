import "dotenv/config"; // Carga variables locales del .env

import express from "express";
import cors from "cors";
import ChistesRouter from "./routes/chiste-routes";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


const app = express();
const PORT = process.env.PORT || 3005;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chistes API",
      version: "1.0.0",
      description: "Documentación de la aplicación de chistes",
    },
    servers: [
      {
        url: "http://localhost:5000", // Change this to your API's base URL
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Adjust this path to point to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// App
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/chistes", ChistesRouter);

export default app;
