"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentDto {
    constructor(data) {
        this.id = data._id;
        this.comment = data.comment;
    }
}
exports.default = CommentDto;
