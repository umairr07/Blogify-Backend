import express from "express";
import { createPost, deletePost, getPosts, postDetails, updatePost, usersPosts } from "../controller/postController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router()

router.post("/create", verifyToken, createPost)
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)
router.get("/:id", verifyToken, postDetails)
router.get("/", getPosts)
router.get("/user/:userId", verifyToken, usersPosts)


export default router;

