import { Router } from "express";
import {
  deleteChisteById,
  getChisteByFuente,
  getChistes,
  getChistesByPuntaje,
} from "../controllers/chiste-controller";
import {
  createChiste,
  getChisteById,
  putChiste,
} from "../controllers/chiste-controller";
import { queryGetHandler, validation } from "../middleware/middleware";
import { chisteSchema } from "../validations/chiste-schema";

const router = Router();

// Rama principal
router.get("/", queryGetHandler);

// Requerimientos
router.get("/fuente/:fuente", getChisteByFuente);
router.post("/", createChiste);
router.get("/:id", getChisteById);
router.put("/:id", validation(chisteSchema), putChiste);
router.delete("/:id", deleteChisteById);

export default router;
