import { Router } from "express";
import {
  deleteChisteById,
  getChisteByFuente,
} from "../controllers/chiste-controller";
import {
  createChiste,
  getChisteById,
  putChiste,
} from "../controllers/chiste-controller";
import { queryGetHandler, validation } from "../middleware/middleware";
import { chisteSchema } from "../validations/chiste-schema";
import { rateLimit } from "express-rate-limit";

const router = Router();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 min
  limit: 10, // Se pueden crear máximo 10 chistes cada 2 minutos (POST)
  message: {
    msg: "Muchas solicitudes desde esta IP. Por favor, espera 2 minutos e inténtalo de nuevo.",
  },
});

/* Ruta principal, api/chistes hace uso del middleware para saber qué controlador usar (puntaje o categoria)
   dependiendo del query ?puntaje o ?categoria
*/
router.get("/", queryGetHandler);
//
router.post("/", limiter, createChiste); // Aplicando rate limiter al post
router.get("/:id", getChisteById);
router.put("/:id", validation(chisteSchema), putChiste);
router.delete("/:id", deleteChisteById);
router.get("/fuente/:fuente", getChisteByFuente);

export default router;
