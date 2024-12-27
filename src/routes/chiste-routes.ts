import { Router } from "express";
import {
  getChiste,
  createChiste,
  getChisteById,
} from "../controllers/chiste-controller";

const router = Router();

// ref a router.route("/").get().post()
router.get("/", getChiste);
router.get("/:id", getChisteById);
router.post("/", createChiste);

export default router;
