import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const commentModel = mongoose.model("Comment", CommentSchema)