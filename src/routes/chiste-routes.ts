import { Router } from "express";
import { getChiste } from "../controllers/chiste-controller";

const router = Router();

router.get("/", getChiste);

export default router;
