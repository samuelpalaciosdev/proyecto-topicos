import "dotenv/config";
import cors from "cors";
import { connectDb } from "./db/connect";
import { swaggerDocs } from "./utils/swagger-ui";
import app from "./index";

const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to MongoDb");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      // Una vez corriendo la app, activa swagger para documentar y visualizar las rutas de la API.
      swaggerDocs(app);
      console.log(`Docs available at http://localhost:${PORT}/api/docs`);
      console.log(`Frontend available at http://localhost:${3000}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Finaliza el proceso de la app, ya que no se pudo iniciar el servidor
  }
};

start();
