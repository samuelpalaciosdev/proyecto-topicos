import app from "./index";
import { connectDb } from "./db/connect";
import { swaggerDocs } from "./utils/swagger-ui";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to MongoDb");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      // Una vez corriendo la app, activa swagger para documentar y visualizar las rutas de la API.
      swaggerDocs(app);
      // REF: quitar port forwarding docker
      console.log(
        `Docs de la api disponibles en http://localhost:${PORT}/api/docs`,
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Finaliza el proceso de la app, ya que no se pudo iniciar el servidor
  }
};

start();
