import "dotenv/config"; // Carga variables locales del .env
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chistes API Docs",
      version: "1.0.0",
      description: "Documentación de la API de Chistes",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3005}`, // Servidor de la app
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Busca las rutas y con eso forma los docs
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export function swaggerDocs(app: Express) {
  // Swagger
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}
