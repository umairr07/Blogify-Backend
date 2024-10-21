import express from "express";
import { createComments, deleteComments, getAllComments, updateComments } from "../controller/commentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router()

router.post("/add", verifyToken, createComments)
router.put("/:id", verifyToken, updateComments)
router.delete("/:id", verifyToken, deleteComments)
router.get("/post/:postId", verifyToken, getAllComments)

export default router;