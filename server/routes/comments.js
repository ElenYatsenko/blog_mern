import { Router } from "express";
import { checkAuth } from "../utils/index.js";
import { CommentsController } from "../controllers/index.js";

const router = new Router();

router.post("/:id", checkAuth, CommentsController.createComment);

export default router;
