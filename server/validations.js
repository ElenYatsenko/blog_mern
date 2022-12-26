import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid format email!").isEmail(),
  body("password", "Invalid format password!").isLength({ min: 5 }),
  body("fullName", "Invalid format name!").isLength({ min: 3 }),
  body("avatarUrl", "Invalid format url on the image!").optional().isURL(),
];

export const loginValidation = [
  body("email", "Invalid format email!").isEmail(),
  body("password", "Invalid format password!").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Enter title article!").isLength({ min: 3 }).isString(),
  body("text", "Enter text article!").isLength({ min: 3 }).isString(),
  body("tags", "Invalid format tags!").optional().isString(),
  body("imageUrl", "Invalid format url image!").optional().isString(),
];
