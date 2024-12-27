import { Router } from "express";
import {
  getChisteByFuente,
  getChistesByPuntaje,
} from "../controllers/chiste-controller";
import { createChiste, getChisteById } from "../controllers/chiste-controller";

const router = Router();

router.get("/", getChistesByPuntaje);
router.post("/", createChiste);
router.get("/:id", getChisteById);
router.get("/fuente/:fuente", getChisteByFuente);

export default router;
