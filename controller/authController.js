import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/token.js";
import jwt from "jsonwebtoken"

//register
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
            message: "User registered successfully!!",
            user: newUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//login
export const login = async (req, res) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found with this email",
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        // console.log(password, ":", user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const { password, ...info } = user._doc

        generateToken(info, "User logged in successfully!!", res)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//logout
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

//refetch user
export const refetch = async (req, res) => {
    const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if (err) {
            res.status(404).json(err)
        }

        res.status(200).json({
            success: true,
            data: data
        })
    })
}