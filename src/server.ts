import app from "./index";
import { connectDb } from "./db/connect";

const PORT = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to MongoDb");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Cerrar
  }
};

start();
