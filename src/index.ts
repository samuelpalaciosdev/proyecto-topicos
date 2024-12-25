import "dotenv/config"; // Carga variables locales del .env

import express from "express";

const app = express();
const PORT = process.env.PORT || 3005;

app.get("/", (_req, res) => {
  res.send("whatsuppppppppppp").status(200);
});

// Inicia el servidor
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
