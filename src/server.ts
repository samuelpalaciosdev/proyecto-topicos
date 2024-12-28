import "dotenv/config";
import express from "express";
import path from "path";
import { connectDb } from "./db/connect";
import { swaggerDocs } from "./utils/swagger-ui";
import app from "./index";

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../frontend/.next")));
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("*", (req, res) => {
  if (req.url.startsWith("/api/")) {
    return;
  }
  res.sendFile(
    path.join(__dirname, "../frontend/.next/server/pages/index.html")
  );
});

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to MongoDb");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      swaggerDocs(app);
      console.log(`Docs available at http://localhost:${PORT}/api/docs`);
      console.log(`Frontend available at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
