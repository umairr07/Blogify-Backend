import jwt from "jsonwebtoken"

export const generateToken = async (user, message, res) => {
    try {
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" })

        res
            .cookie("token", token)
            .json({
                success: true,
                message,
                user,
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating token",
            error: error.message,
        });
    }
}