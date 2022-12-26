import express from "express";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { postCreateValidation } from "./validations.js";
import { PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 4444;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nbceibs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB ok"))
  .catch((error) => console.log(error));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/auth/", authRouter);
app.use("/posts/", postRouter);
app.use("/comments/", commentsRouter);

app.post(
  "/upload",
  checkAuth,
  postCreateValidation,
  upload.single("image"),
  (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  }
);

app.get("/tags", PostController.getLastTags);

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server OK");
});
