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

const router = Router();

router.get("/", getChistesByPuntaje);
router.post("/", createChiste);
router.get("/:id", getChisteById);
router.put("/:id", validation(chisteSchema), putChiste);
router.delete("/:id", deleteChisteById);
router.get("/fuente/:fuente", getChisteByFuente);

export default router;
