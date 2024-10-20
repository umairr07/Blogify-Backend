import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
    // console.log(req.body)
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Checking if the user already exists
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists with that email."
            });
        }

        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await userModel.create({ username, email, password: hashedPassword })

        res.json({
            message: "User created successfully!!",
            user: newUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found with this email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        generateToken(user, "User logged in successfully!!", res)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token",
            {
                sameSite: "none",
                secure: true
            },
        ).status(200).json({
            success: true,
            message: "User logged out successfully!!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}