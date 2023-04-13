"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
    }
}, {
    timestamps: true
});
const LikeModel = (0, mongoose_1.model)('Like', likeSchema, 'likes');
exports.default = LikeModel;
