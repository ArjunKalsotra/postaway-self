import mongoose from "mongoose"
import { ApplicationError } from "../../error-handler/errorHandler.js";
import { PostSchema } from "./post.schema.js";
const PostModel = mongoose.model('Post', PostSchema)

export default class PostRepo {
    async createPost(userId, imageUrl, caption) {
        try {
            const createPost = new PostModel({
                userId,
                imageUrl: imageUrl.filename,
                caption
            })
            return await createPost.save()
        } catch (error) {
            throw new ApplicationError(error.message, 500)
        }
    }
    async getOne(postId) {
        try {
           const res= await PostModel.findById(postId)
           return res
        } catch (error) {
            throw new ApplicationError(error.message, 500)
        }
    }
}