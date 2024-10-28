import express from "express";
import { login, logout, refetch, register } from "../controller/authController.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/refetch", refetch)

export default router;