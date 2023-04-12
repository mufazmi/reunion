import {model, Schema, Document, Model } from 'mongoose';

export interface IComment extends Document {
  userId: Schema.Types.ObjectId;
  comment: String;
}

const commentSchema: Schema<IComment> = new Schema<IComment>({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comment :{
    type:String,
    required : true
  }
},{

  timestamps: true
});

const CommentModel: Model<IComment> = model<IComment>('Comment', commentSchema, 'comments');

export default CommentModel;
