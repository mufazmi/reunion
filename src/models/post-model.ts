import { model, Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
    userId:Schema.Types.ObjectId
    title: string
    desc: string
}

const postSchema: Schema<IPost> = new Schema<IPost>({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const PostModel: Model<IPost> = model<IPost>('Post', postSchema, 'posts');

export default PostModel;
