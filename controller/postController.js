import { postModel } from "../models/postModel.js"

//create post
export const createPost = async (req, res) => {
    try {
        const newPost = req.body
        const savePost = await postModel.create(newPost)

        res.status(200).json({
            success: true,
            message: "Post created successfully!!",
            post: savePost
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

//update post
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const updatedPost = await postModel.findByIdAndUpdate(postId,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Post updated successfully!!",
            post: updatedPost
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

//delete post
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const deletePost = await postModel.findByIdAndDelete(postId)
        const deleteComments = await postModel.deleteMany({ postId: postId })

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
        res.status(500).json({
            error: error
        })
    }
}

//get posts
export const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find()

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully!!",
            posts: posts
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

//getPost details
export const postDetails = async (req, res) => {
    try {
        const postDetails = await postModel.findById(req.params.id)

        res.status(200).json({
            success: true,
            message: "Post details!!",
            postDetails: postDetails
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

//get specific users posts
export const usersPosts = async (req, res) => {
    try {
        const userPosts = await postModel.find({ userId: req.params.userId })

        res.status(200).json({
            success: true,
            message: "Users posts fetched successfully!!",
            posts: userPosts
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}