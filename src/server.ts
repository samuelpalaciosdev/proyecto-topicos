import app from "./index";
import { connectDb } from "./db/connect";
import { swaggerDocs } from "./utils/swagger-ui";

const PORT = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to MongoDb");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);

      swaggerDocs(app);
      // REF: quitar port forwarding docker
      console.log(
        `Docs de la api disponibles en http://localhost:${PORT}/api/docs`,
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Cerrar
  }
};

start();
