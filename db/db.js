import mongoose from "mongoose";

// export const connectToDB = async () => {
//     const connectDb = await mongoose.connect(process.env.MONGO_URI)
//         .then(() => console.log("DB connected successfully"))
//         .catch((err) => console.log(err))
// }

export const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully")
    } catch (error) {
        console.log(error)
    }
}