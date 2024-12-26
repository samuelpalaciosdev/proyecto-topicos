import { Router } from "express";
import { getChiste, createChiste } from "../controllers/chiste-controller";

const router = Router();

router.get("/", getChiste);
router.post("/", createChiste);

export default router;
