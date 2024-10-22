import jwt from "jsonwebtoken"

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

        next()
    })

}