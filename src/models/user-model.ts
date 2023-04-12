import  { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import Constants from '../utils/constants';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required:true
    },
}, {
    timestamps: true
});

userSchema.pre<IUser>('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(Constants.AUTH.SALT_FACTOR, (err, salt) => {
        if (err)
            return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            return next();
        })
    })
});


const UserModel = model<IUser>('User', userSchema, 'users');
export default UserModel;
