import {model, Schema, Document, Model, Types } from 'mongoose';

export interface ILike extends Document {
  userId: Schema.Types.ObjectId;
  postId: Types.ObjectId;
}

const likeSchema: Schema<ILike> = new Schema<ILike>({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postId :{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }
},{

  timestamps: true
});

const LikeModel: Model<ILike> = model<ILike>('Like', likeSchema, 'likes');

export default LikeModel;
