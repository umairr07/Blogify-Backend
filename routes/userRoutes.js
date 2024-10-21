import express from "express";
import { deleteUser, getUser, updateUser } from "../controller/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router()

router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", verifyToken, getUser)

export default router;