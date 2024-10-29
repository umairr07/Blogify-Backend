import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    // console.log(token)

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated",
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token is not valid!",
            })
        }

        req.userId = data._id
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findOne(decode._id)
        next()
    })

}