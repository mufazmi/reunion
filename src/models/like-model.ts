import {model, Schema, Document, Model } from 'mongoose';

export interface ILike extends Document {
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
}

const likeSchema: Schema<ILike> = new Schema<ILike>({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postId :{
    type: Schema.Types.ObjectId,
    ref: 'Pos',
  }
},{

  timestamps: true
});

const LikeModel: Model<ILike> = model<ILike>('Like', likeSchema, 'likes');

export default LikeModel;
