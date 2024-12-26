import app from "./index"; // Import the Express app
import connectDb from "./db/connect"; // Import your DB connection function

const PORT = process.env.PORT || 3005;

// Connect to the database and start the server
const start = async () => {
  try {
    await connectDb(); // Connect to the database
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Cerrar
  }
};

start();
