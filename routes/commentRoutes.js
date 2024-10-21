import express from "express";
import { createComments, deleteComments, getAllComments, updateComments } from "../controller/commentController.js";

const router = express.Router()

router.post("/add", createComments)
router.put("/:id", updateComments)
router.delete("/:id", deleteComments)
router.get("/post/:postId", getAllComments)

export default router;