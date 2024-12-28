import { Router } from "express";
import {
  deleteChisteById,
  getChisteByFuente,
  getChistesByPuntaje,
} from "../controllers/chiste-controller";
import {
  createChiste,
  getChisteById,
  putChiste,
} from "../controllers/chiste-controller";
import { validation } from "../middleware/middleware";
import { chisteSchema } from "../validations/chiste-schema";
import { rateLimit } from "express-rate-limit";


const router = Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  limit: 3,
  message: {
    msg: "Muchas solicitudes desde esta IP. Por favor, espera 5 minutos e inténtalo de nuevo.",
  },
});

router.get("/", getChistesByPuntaje);
router.post("/", limiter, createChiste); // Aplicando rate limiter al post
router.get("/:id", getChisteById);
router.put("/:id", validation(chisteSchema), putChiste);
router.delete("/:id", deleteChisteById);
router.get("/fuente/:fuente", getChisteByFuente);

export default router;
