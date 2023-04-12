import { model, Schema, Document, Model, Types } from 'mongoose';

export interface IComment extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  comment: string;
}

const commentSchema: Schema<IComment> = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required:true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const CommentModel: Model<IComment> = model<IComment>('Comment', commentSchema, 'comments');

export default CommentModel;
