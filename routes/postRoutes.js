import express from "express";
import { createPost, deletePost, getPosts, postDetails, updatePost, usersPosts } from "../controller/postController.js";

const router = express.Router()

router.post("/create", createPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.get("/:id", postDetails)
router.get("/", getPosts)
router.get("/user/:userId", usersPosts)


export default router;

