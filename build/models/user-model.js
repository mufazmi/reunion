"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = __importDefault(require("../utils/constants"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt_1.default.genSalt(constants_1.default.AUTH.SALT_FACTOR, (err, salt) => {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            return next();
        });
    });
});
const UserModel = (0, mongoose_1.model)('User', userSchema, 'users');
exports.default = UserModel;
