import express from "express"
import dotenv from "dotenv"
import { connectToDB } from "./db/db.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import cookieParser from "cookie-parser"


dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/comments", commentRoutes)
app.use("/api/v1/posts", postRoutes)


app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
    connectToDB()
})