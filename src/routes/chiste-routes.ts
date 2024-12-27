import { Router } from "express";
import { getChisteByFuente } from "../controllers/chiste-controller";

const router = Router();

router.get("/fuente/:fuente", getChisteByFuente);

export default router;
