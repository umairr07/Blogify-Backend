import { commentModel } from "../models/commentsModel.js"

//create comments / add comments
export const createComments = async (req, res) => {
    try {
        const comment = req.body
        const newComment = await commentModel.create(comment)

        res.status(200).json({
            success: true,
            message: "Comment added",
            comment: newComment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//update comments
export const updateComments = async (req, res) => {
    try {
        const updateComment = await commentModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Comment updated",
            comment: updateComment
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//delete comments
export const deleteComments = async (req, res) => {
    try {
        const deleteComment = await commentModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Comment deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//get comments of posts
export const getAllComments = async (req, res) => {
    try {
        const allComments = await commentModel.find({ postId: req.params.postId })
        res.status(200).json({
            success: true,
            message: "All comments fetched",
            comments: allComments
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}