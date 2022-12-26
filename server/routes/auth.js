import { Router } from "express";
import { UserController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "../validations.js";

const router = new Router();

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

router.get("/me", checkAuth, UserController.getMe);

export default router;
