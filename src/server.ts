import "dotenv/config";
import cors from "cors";
import { connectDb } from "./db/connect";
import { swaggerDocs } from "./utils/swagger-ui";
import app from "./index";

const PORT = process.env.PORT || 3005;

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
      swaggerDocs(app);
      console.log(`Docs available at http://localhost:${PORT}/api/docs`);
      console.log(`Frontend available at http://localhost:${3000}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
