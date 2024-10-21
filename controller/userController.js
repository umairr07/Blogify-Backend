import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import { postModel } from "../models/postModel.js"
import { commentModel } from "../models/commentsModel.js"

//update user
export const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password, salt)
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.status(200).json({
            success: true,
            message: "User updated successfully!!",
            updateUser: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//delete user
export const deleteUser = async (req, res) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.params.id)
        const deletePost = await postModel.deleteMany({ userId: req.params.id })
        const deleteComments = await commentModel.deleteMany({ userId: req.params.id })

        if (deleteUser) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully!!"
            })
        }

        if (deletePost) {
            res.status(200).json({
                success: true,
                message: "Post deleted successfully!!"
            })
        }

        if (deleteComments) {
            res.status(200).json({
                success: true,
                message: "Comments deleted successfully!!"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//get user
export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json({
            success: true,
            message: "User fetched successfully!!",
            user: info
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}