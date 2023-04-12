import mongoose, { Schema, Document, Types } from 'mongoose';


export interface IFollow extends Document {
  fromUser: Schema.Types.ObjectId;
  toUser: Types.ObjectId;
}

const followSchema: Schema<IFollow> = new Schema<IFollow>({
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  toUser :{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
},{

  timestamps: true
});

const FollowModel = mongoose.model<IFollow>('Follow', followSchema, 'follows');

export default FollowModel;
