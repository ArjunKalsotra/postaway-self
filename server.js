import "./env.js"
import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import { errorHandler } from "./src/error-handler/errorHandler.js"
import connectUsingMongoose from "./src/config/mongoose.js"
import jwtAuth from "./src/middlewares/jwt.config.js";
import userRouter from "./src/features/user/user.route.js"
import postRouter from "./src/features/post/post.router.js"
import commentRouter from "./src/features/comment/comment.router.js"
import likeRouter from "./src/features/like/like.router.js"
import friendRouter from "./src/features/friendship/friend.router.js"
import otpRouter from "./src/features/otp/otp.router.js"
// Initialize Express
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());


//routes
app.use("/api/users",userRouter)
app.use("/api/posts",jwtAuth,postRouter)
app.use("/api/comments",jwtAuth,commentRouter)
app.use("/api/likes",jwtAuth,likeRouter)
app.use("/api/friends",jwtAuth,friendRouter)
app.use("/api/otp",jwtAuth,otpRouter)
//application level error handler middleware
app.use(errorHandler)

//start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
    // Connect to MongoDB
    connectUsingMongoose()
});
